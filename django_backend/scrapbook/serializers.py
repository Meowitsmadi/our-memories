from rest_framework import serializers
from django.db import models
from authentication.models import CustomUser
from .models import Album, Page, Media

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model=Album
        fields=["id", "name", "user", "date_created", "last_updated", "cover_img"]
        read_only_fields=["user", "date_created", "last_updated"]

    def create(self, validated_data):
        return Album.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name=validated_data.get('name', instance.name)
        if 'cover_img' in validated_data:
            instance.cover_img = validated_data.get('cover_img', instance.cover_img)
        instance.save()
        return instance
    
class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model=Page
        fields=["id", "album", "name", "date_created", "order"]
        read_only_fields=["order", "date_created"]
    
    def create(self, validated_data):
        album = validated_data["album"]
        # retrieve all pages of an album, get max order # or 0 if none
        previous_order = album.pages.aggregate(models.Max('order')).get('order__max') or 0
        validated_data["order"] = previous_order + 1
        return Page.objects.create(**validated_data)

class MediaSerializer(serializers.ModelSerializer):
    # album = serializers.PrimaryKeyRelatedField(read_only=True)
    # page = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model=Media
        fields=["id", "album", "page","type", "content", "x", "y", "width", "height", "date_created"]
        read_only_fields=["id", "album", "page", "date_created"]

    def create(self, validated_data):
        page = self.context['page']
        album = page.album
        return Media.objects.create(page=page, album=album, **validated_data)



