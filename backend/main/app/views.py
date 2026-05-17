from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework import status
from .models import Users
from .serializer import UserSerializer, ProfileSerializer, UrlCheckRequestSerializer, UrlCheckResponseSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from rest_framework.parsers import MultiPartParser, FormParser
from ml.dataset.url_model import predict_url


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
        serializer = UserSerializer(request.user)
        return Response(serializer.data)



class LogoutView(APIView):
    def post(self, request):
        response = Response({'Детали': 'Выход успешно выполнен'})
        response.delete_cookie('access', path='/')
        response.delete_cookie('refresh', path='/')
        return response
    

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
            'probability': result['probability'],
        }
        response_serializer = UrlCheckResponseSerializer(response_data,data=request.data)
        response_serializer.is_valid(raise_exception=True)
        return Response(response_serializer.data)