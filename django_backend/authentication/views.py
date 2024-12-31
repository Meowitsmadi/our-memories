from django.shortcuts import render
import json
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny

# class HomeView(APIView):
     
#    permission_classes = (IsAuthenticated, )
#    def get(self, request):
#        content = {'message': 'Welcome to the JWT Authentication page using React Js and Django!'}
#        return Response(content)
   
class LoginView(APIView):
       permission_classes = (AllowAny, )
       def post(self, request):
           username = request.data.get('username')
           password = request.data.get('password')
           if not username or not password:
            return Response({"error": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)
           user = authenticate(username=username, password=password)
           if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)
           else:
               return Response({"Invalid login credentials"}, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes = (IsAuthenticated, )
    def post(self, request):
        try:
            print("Refresh token:", )
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

