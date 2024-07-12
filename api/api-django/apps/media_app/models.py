from cloudinary.models import CloudinaryField
from django.db import models


class UserImageModel(models.Model):
    asset_id = models.CharField(max_length=255, unique=True)
    public_id = models.CharField(max_length=255, unique=True)
    filename = models.CharField(max_length=255)
    secure_url = models.CharField(max_length=255)
    url = models.CharField(max_length=255)
    format = models.CharField(max_length=255)
    width = models.CharField(max_length=255)
    height = models.CharField(max_length=255)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f'Image: {self.filename} - User: {self.user.id}'


class QuizImageModel(models.Model):
    asset_id = models.CharField(max_length=255, unique=True)
    public_id = models.CharField(max_length=255, unique=True)
    filename = models.CharField(max_length=255)
    secure_url = models.CharField(max_length=255)
    url = models.CharField(max_length=255)
    format = models.CharField(max_length=255)
    width = models.CharField(max_length=255)
    height = models.CharField(max_length=255)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f'Image: {self.filename} - Quiz: {self.quiz.slug}-{self.quiz.id}'

