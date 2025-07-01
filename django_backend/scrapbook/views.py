from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .models import Album, Page, Media
from .serializers import AlbumSerializer, PageSerializer, MediaSerializer

# ---- ALBUM VIEWS ----
class CreateAlbumView(APIView):
    permission_classes=[IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        user = request.user
        serializer = AlbumSerializer(data=request.data)
        if serializer.is_valid():
            album = serializer.save(user=user)
            return Response(AlbumSerializer(album).data, status=status.HTTP_201_CREATED)
            # return Response({
            #     "message": "Album created successfully",
            #     "name": album.name,
            # }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DisplayAlbumsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        albums = Album.objects.filter(user=request.user)
        serializer = AlbumSerializer(albums, many=True)
        return Response(serializer.data)

class UpdateAlbumView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def patch(self, request, album_id):
        album = Album.objects.get(id=album_id, user=request.user)
        serializer = AlbumSerializer(album, data=request.data, partial=True)
        if serializer.is_valid():
            album = serializer.save()
            return Response({
                "message": "Album updated successfully",
                "album_name": album.name,
                "album_cover": album.cover_img,
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ---- PAGE VIEWS ----
class DisplayPagesInAlbum(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, album_id):
        pages = Page.objects.filter(album__id=album_id)
        serializer = PageSerializer(pages, many=True)
        return Response(serializer.data)

class DisplaySingularPageView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, album_id, page_id):
        page = Page.objects.get(album__id=album_id, id=page_id)
        serializer = PageSerializer(page)
        return Response(serializer.data)

class CreatePageView(APIView):
    permission_classes=[IsAuthenticated]

    def post(self, request):
        serializer = PageSerializer(data=request.data)
        if serializer.is_valid():
            page = serializer.save()
            return Response(PageSerializer(page).data, status=status.HTTP_201_CREATED)
            # return Response({
            #     "message": "Page created successfully",
            #     "name": page.name,
            # }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ---- MEDIA VIEWS ----
class CreateMediaView(APIView):
    permission_classes=[IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def post(self, request, album_id, page_id):
        page = Page.objects.get(id=page_id, album__id=album_id)
        if not page:
            return Response({'error': 'Page does not exist in this album'}, status=404)
        serializer = MediaSerializer(data=request.data, context={'page': page}, partial=True)
        if serializer.is_valid():
            media = serializer.save()
            return Response(MediaSerializer(media).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DisplayMediaView(APIView):
    permission_classes=[IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request, album_id, page_id):
        media_list = Media.objects.filter(album__id=album_id, page__id=page_id)
        serializer = MediaSerializer(media_list, many=True)
        return Response(serializer.data)

class UpdateMediaView(APIView):
    permission_classes=[IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def patch(self, request, media_id):
        media = Media.objects.get(id=media_id)
        serializer = MediaSerializer(media, data=request.data, partial=True)
        if serializer.is_valid():
            media = serializer.save()
            return Response(MediaSerializer(media).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
