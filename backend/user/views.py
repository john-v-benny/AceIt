from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer

# Generate JWT Token for User
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

# Signup API
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token = get_tokens_for_user(user)
        return Response({"message": "User created successfully!", "token": token})
    return Response(serializer.errors, status=400)

# Login API (JWT Token Generation)
@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    email = request.data.get('username')  # Email is being used as the username
    password = request.data.get('password')

    try:
        user = User.objects.get(email=email)
        user = authenticate(username=user.username, password=password)
        if user:
            token = get_tokens_for_user(user)
            return Response({"message": "Login successful!", "token": token})
        return Response({"error": "Invalid credentials"}, status=400)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=400)
