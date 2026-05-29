import math
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth import authenticate
from rest_framework import status
from .models import Users, Review, UrlCheckResults, Favorite
from .serializer import UserSerializer, ProfileSerializer,  UrlCheckRequestSerializer, UrlCheckResponseSerializer, ReviewCreateSerializer, ReviewResponseSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from rest_framework.parsers import MultiPartParser, FormParser
from ml.dataset.url_model import predict_url
from .mixins import ManageFavorite
from rest_framework import viewsets



class LoginAPIView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            token = RefreshToken.for_user(user)
            refresh = str(token)
            access = str(token.access_token)
            response =  Response({'refresh': refresh,
                             'access': access})
            response.set_cookie(
                key='access',
                value=access,
                httponly=True,
                secure=not settings.DEBUG,
                samesite='Lax',
                max_age=60 * 60,
                path='/'
            )

            response.set_cookie(
                key='refresh',
                value=refresh,
                httponly=True,
                secure=not settings.DEBUG,
                samesite='Lax',
                max_age=24 * 60 * 60,
                path='/'
            )
            return response
        return Response({'error': 'Неверные данные'})



class RegisterAPIView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request):
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data ,status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user_serializer = UserSerializer(request.user)
        reviews = Review.objects.filter(user = request.user)
        results = UrlCheckResults.objects.filter(user = request.user)
        reviews_serailizer = ReviewResponseSerializer(reviews, many=True)
        results_serializer = UrlCheckResponseSerializer(results, many=True)
        return Response({'user':user_serializer.data, 'reviews':reviews_serailizer.data, 'results':results_serializer.data})



class LogoutView(APIView):
    def post(self, request):
        response = Response({'Детали': 'Выход успешно выполнен'})
        response.delete_cookie('access', path='/')
        response.delete_cookie('refresh', path='/')
        return response
    
# ========================== API для обновления профиля
class UserUpdateView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    def patch(self, request, pk):
        user = Users.objects.get(pk=pk)
        serializer = ProfileSerializer(user, data = request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ========================================== API для создания проверок на фишинг
class CheckUrlAPIView(APIView):
    def post(self, request):
        serializer = UrlCheckRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        url = serializer.validated_data['url']
        try:
            result = predict_url(url)
        except FileNotFoundError as exc:
            return Response({'error': str(exc)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as exc:
            return Response({'error': 'Ошибка при проверке URL: ' + str(exc)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        response_data = {
            'url': result['raw_url'],
            'label': 'phishing' if result['label'] == 1 else 'safe',
            'probability': round(result['probability'], 4),
        }
        response_serializer = UrlCheckResponseSerializer(data=response_data)
        response_serializer.is_valid(raise_exception=True)
        response_serializer.save(user = request.user)
        return Response(response_serializer.data)
    

# =======================================API для создания и просмотров комментариев
class ReviewCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = ReviewCreateSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user = request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        reviews = Review.objects.all()
        serializer = ReviewResponseSerializer(reviews, many=True)
        return Response(serializer.data)
        


# =========================================API для админки
class AdminUsersAPIView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    def get(self, request):
        users = Users.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    
    def delete(self, request, pk):
        try:
            user = Users.objects.get(pk=pk)
        except Users.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        if user:
            user.delete()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_204_NO_CONTENT)
        

class AdminReviewsAPIView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    def get(self, request):
        reviews = Review.objects.all()
        serializer = ReviewResponseSerializer(reviews, many=True)
        return Response(serializer.data)
    def delete(self, request, pk):
        try:
            review = Review.objects.get(pk=pk)
        except Review.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        if review:
            review.delete()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class AdminResultsAPIView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    def get(self, request):
        results = UrlCheckResults.objects.all()
        serializer = UrlCheckResponseSerializer(results, many=True)
        return Response(serializer.data)
    def delete(self, request, pk):
        try:
            result = UrlCheckResults.objects.get(pk=pk)
        except UrlCheckResults.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        if result:
            result.delete()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class FavoriteListAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        favorites = Favorite.objects.filter(user=request.user)
        url_ids = favorites.values_list('object_id', flat=True)
        urls = UrlCheckResults.objects.filter(id__in=url_ids)
        serializer = UrlCheckResponseSerializer(urls, many=True)

        return Response(serializer.data)
    
    
# ==========================ViewSet ДЛЯ ИЗБРАННОГО
class UrlResultsViewSet(viewsets.ModelViewSet, ManageFavorite):
    serializer_class = UrlCheckRequestSerializer

    def get_queryset(self):
        queryset = UrlCheckResults.objects.filter(user=self.request.user)
        queryset = self.annotate_qs_is_favorite_field(queryset)
        return queryset 




        
    



