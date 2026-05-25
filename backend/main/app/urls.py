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
    path('review/', views.ReviewCreateAPIView.as_view(), name='review'),
    path('users-admin/', views.AdminUsersAPIView.as_view(), name='users-admin'),
    path('reviews-admin/', views.AdminReviewsAPIView.as_view(), name='reviews-admin'),
    path('results-admin/', views.AdminResultsAPIView.as_view(), name='results-admin'),
    path('user-delete/<int:pk>/', views.AdminUsersAPIView.as_view(), name='user-delete'),
    path('review-delete/<int:pk>/', views.AdminReviewsAPIView.as_view(), name='review-delete'),
    path('result-delete/<int:pk>/', views.AdminResultsAPIView.as_view(), name='result-delete'),
]


