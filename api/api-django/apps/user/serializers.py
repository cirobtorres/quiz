from django.contrib.auth import get_user_model
from rest_framework.serializers import ModelSerializer
from .models import UserSettingsModel
from ..media_app.serializers import UserImageSerializer
from ..score.serializers import UserScoreProfileSerializer


class UserSettingsSerializer(ModelSerializer):
    class Meta:
        model = UserSettingsModel
        fields = (
            'id', 
            'quiz', 
            'quiz_size', 
            'time_to_answer', 
            'updated_at', 
        )
        read_only_fields = 'id', 'user', 'updated_at',


class UserSerializer(ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = (
            'id', 
            'email', 
            'username', 
            'avatar', # OnetoMany
            'settings', # OnetoMany
            'scores', # Manytomany
            'is_active', 
            'last_login', 
            'created_at', 
            'updated_at', 
        )
        read_only_fields = (
            'id', 
            'avatar', 
            'last_login', 
            'created_at', 
            'updated_at', 
        )
    
    avatar = UserImageSerializer(required=False)
    settings = UserSettingsSerializer(required=False)
    scores = UserScoreProfileSerializer(required=False)


class UserListSerializer(ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = (
            'id', 
            'email', 
            'username', 
            'avatar', # One-to-Many
            'settings', # One-to-Many
            'scores', # Mant-to-many
            'is_active', 
            'last_login', 
            'created_at', 
            'updated_at', 
        )
        read_only_fields = (
            'id', 
            'avatar', 
            'last_login', 
            'created_at', 
            'updated_at', 
        )

