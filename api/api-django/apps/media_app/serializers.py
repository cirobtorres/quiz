from rest_framework.serializers import ModelSerializer
from .models import UserImageModel, QuizCoverModel


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
            'format', 
            'width', 
            'height', 
            'updated_at', 
        )
        read_only_fields = (
            'id', 
            'asset_id', 
            'public_id', 
            'secure_url', 
            'url', 
            'format', 
            'updated_at', 
        ) 


class QuizCoverSerializer(ModelSerializer):
    class Meta:
        model = QuizCoverModel
        fields = (
            'id', 
            'asset_id', 
            'public_id', 
            'filename', 
            'secure_url', 
            'url', 
            'format', 
            'width', 
            'height', 
            'updated_at', 
        )
        read_only_fields = (
            'id', 
            'asset_id', 
            'public_id', 
            'secure_url', 
            'url', 
            'format', 
            'updated_at', 
        )

