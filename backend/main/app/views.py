from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework import status
from .models import Users
from .serializer import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings



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
                max_age=15 * 60,
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
    def post(self, request):
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data ,status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        return Response({
            'username': user.username,
            'email': user.email
        })


class LogoutView(APIView):
    def post(self, request):
        response = Response({'Детали': 'Выход успешно выполнен'})
        response.delete_cookie('access', path='/')
        response.delete_cookie('refresh', path='/')
        return response