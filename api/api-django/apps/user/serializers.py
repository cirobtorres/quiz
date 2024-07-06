from django.contrib.auth import get_user_model
from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework.validators import ValidationError
from .validators import UserValidator
from .models import UserSettingsModel


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
            'password', 
            'avatar', 
            'settings', 
            'total_score',
            'get_last_score_id',
            'get_avatar_url', 
            'get_score', 
            'is_active', 
            'last_login', 
            'created_at', 
            'updated_at', 
        )
        read_only_fields = 'id', 'get_avatar_url', 'get_score', 'is_active', 'last_login', 'created_at', 'updated_at', 
        extra_kwargs = { 
            'password': { 'write_only': True }, 
            'avatar': { 'write_only': True }, 
        }
    
    get_avatar_url = SerializerMethodField()
    get_last_score_id = SerializerMethodField()
    settings = UserSettingsSerializer(required=False)

    def get_avatar_url(self, instance):
        return instance.get_avatar_url()

    def get_last_score_id(self, instance):
        return instance.get_last_score_id()
    
    def is_valid(self, *, raise_exception=False): 
        try:
            UserValidator(self.initial_data)
        except ValidationError as e:
            raise ValidationError(e.detail, code=e.status_code)

        return super().is_valid(raise_exception=raise_exception)

    def validate(self, attrs):
        validate = super().validate(attrs)
        
        return validate
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        settings_data = validated_data.pop('settings', {})

        settings = UserSettingsModel.objects.create(**settings_data)
        
        instance = self.Meta.model(**validated_data, settings=settings)

        if password is not None:
            instance.set_password(password)
        
        instance.save()

        return instance
    
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        
        if password is not None:
            instance.set_password(password)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()

        return instance 

