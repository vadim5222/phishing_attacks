from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', views.UserProfileView.as_view(), name='user_profile'),
    path('login/', views.LoginAPIView.as_view(), name='login'),
    path('register/', views.RegisterAPIView.as_view(), name='register'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('profile/<int:pk>/', views.UserUpdateView.as_view(), name='update'),
    path('check-url/', views.CheckUrlAPIView.as_view(), name='check_url'),
    path('review/', views.ReviewCreateAPIView.as_view(), name='review')
]


