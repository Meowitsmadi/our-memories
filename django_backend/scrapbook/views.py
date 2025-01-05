from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Album
from .serializers import AlbumSerializer

class CreateAlbumView(APIView):
    permission_classes=[IsAuthenticated]

    def post(self, request):
        user = request.user
        serializer = AlbumSerializer(data=request.data)
        if serializer.is_valid():
            album = serializer.save(user=user)
            return Response({
                "message": "Album created successfully",
                "name": album.name,
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



