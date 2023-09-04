from django.contrib.auth import get_user_model
from django.utils import timezone

from rest_framework import serializers

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import QuizUser


class QuizUserSerializer(serializers.ModelSerializer):
    class Meta:
        model: QuizUser = get_user_model()
        fields = (
            'id',
            'username',
            'password',
            'avatar',
            'get_total_correct_answers',
            'score',
            'is_active',
            'is_staff',
            'last_login',
            'created_at',
            'updated_at',
        )
        read_only_fields = (
            'id',
            'get_total_correct_answers',
            'score',
            'is_active',
            'is_staff',
            'last_login',
            'created_at',
            'updated_at',
        )
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        password: str = validated_data.pop('password', None)
        instance: QuizUser = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        password: str = validated_data.pop('password', None)
        if password is not None:
            instance.set_password(password)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Customization of the token response data"""
    @classmethod
    def get_token(cls, user):

        token = super().get_token(user)

        token['userData'] = {
            'id': user.id,
            'username': user.username,
            'avatar': user.avatar.url if user.avatar else None,
            'is_active': user.is_active,
            'is_staff': user.is_staff,
            'last_login': (
                timezone.localtime(user.last_login)
                .strftime("%d-%m-%Y %H:%M:%S")
                if user.last_login else None
            ),
            'created_at': (
                timezone.localtime(user.created_at)
                .strftime("%d-%m-%Y %H:%M:%S")
            ),
        }

        return token

    def validate(self, attrs):

        data = super().validate(attrs)

        user = self.user
        user.last_login = timezone.now()

        user.save()

        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        return data
