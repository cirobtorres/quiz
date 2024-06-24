from django.contrib.auth import get_user_model
from rest_framework.serializers import ModelSerializer
from rest_framework.validators import ValidationError
from .models import ScoreModel
from .validators import UserValidator


class UserSerializer(ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = 'id', 'email', 'username', 'password', 'avatar', 'get_total_score', 'is_active', 'is_staff', 'last_login', 'created_at', 'updated_at', 
        read_only_fields = 'id', 'get_total_score', 'is_active', 'is_staff', 'last_login', 'created_at', 'updated_at', 
        extra_kwargs = { 'password': { 'write_only': True } }
    
    def is_valid(self, *, raise_exception=False):        
        try:
            UserValidator(self.initial_data)
        except ValidationError as e:
            raise ValidationError(e.detail, code=e.status_code)

        return super().is_valid(raise_exception=raise_exception)

    def validate(self, attrs):
        validate = super().validate(attrs)
        
    #     try:
    #         UserValidator(validate)
    #     except ValidationError as e:
    #         raise ValidationError(e.detail, code=e.status_code)
        
        return validate
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

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


class UserScoreSerializer(ModelSerializer):
    class Meta:
        model = ScoreModel
        fields = 'quiz', 'user', 'total', 'corrects', 'get_score_percentage', 'created_at', 
        read_only_fields = 'get_score_percentage', 'created_at', 


