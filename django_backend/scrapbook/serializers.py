from rest_framework import serializers
from authentication.models import CustomUser
from .models import Album


class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model=Album
        fields = ["name", "user", "date_created", "last_updated"]
        read_only_fields = ["user", "date_created", "last_updated"]

    def create(self, validated_data):
        return Album.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance


