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
        )
        read_only_fields = (
            'id', 
            'asset_id', 
            'public_id', 
            'secure_url', 
            'url', 
            'type', 
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
        )
        read_only_fields = (
            'id', 
            'asset_id', 
            'public_id', 
            'secure_url', 
            'url', 
            'type', 
        )

