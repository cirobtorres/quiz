from rest_framework.serializers import ModelSerializer
from .models import UserImageModel, QuizImageModel


class UserImageSerializer(ModelSerializer):
    class Meta:
        model = UserImageModel
        fields = (
            'id', 
            'asset_id', 
            'public_id', 
            'filename', 
            'secure_url', 
            'url', 
            'type', 
            'width', 
            'height', 
            'updated_at', 
            'created_at', 
        )
        read_only_fields = (
            'id', 
            'asset_id', 
            'public_id', 
            'secure_url', 
            'url', 
            'type', 
            'updated_at', 
            'created_at', 
        ) 


class QuizImageSerializer(ModelSerializer):
    class Meta:
        model = QuizImageModel
        fields = (
            'id', 
            'asset_id', 
            'public_id', 
            'filename', 
            'secure_url', 
            'url', 
            'type', 
            'width', 
            'height', 
            'updated_at', 
            'created_at', 
        )
        read_only_fields = (
            'id', 
            'asset_id', 
            'public_id', 
            'secure_url', 
            'url', 
            'type', 
            'updated_at', 
            'created_at', 
        )

