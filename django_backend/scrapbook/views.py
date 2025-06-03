from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Album, Page, Media
from .serializers import AlbumSerializer, PageSerializer, MediaSerializer

class CreateAlbumView(APIView):
    permission_classes=[IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

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

class DisplayAlbumsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        albums = Album.objects.filter(user=request.user)
        serializer = AlbumSerializer(albums, many=True)
        return Response(serializer.data)

class DisplayPagesInAlbum(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, album_id):
        pages = Page.objects.filter(album__id=album_id)
        serializer = PageSerializer(pages, many=True)
        return Response(serializer.data)

class CreatePageView(APIView):
    permission_classes=[IsAuthenticated]

    def post(self, request):
        serializer = PageSerializer(data=request.data)
        if serializer.is_valid():
            page = serializer.save()
            return Response({
                "message": "Page created successfully",
                "name": page.name,
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreateMediaView(APIView):
    permission_classes=[IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, album_id, page_id):
        page = Page.objects.get(id=page_id, album__id=album_id)
        if not page:
            return Response({'error': 'Page does not exist in this album'}, status=404)
        serializer = MediaSerializer(data=request.data, context={'page': page})
        if serializer.is_valid():
            media = serializer.save()
            return Response({
                "message": "Media created successfully",
                "album_id": media.album.id,
                "page_id": media.page.id,
                "media_id": media.id,
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

