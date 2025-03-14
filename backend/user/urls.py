from django.urls import path
from .views import register_user, login_user
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('api/register/', register_user, name='register'),  # User signup
    path('api/login/', login_user, name='login'),          # User login
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Refresh token
]
