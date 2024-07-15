from cloudinary.models import CloudinaryField
import cloudinary.uploader as cloudinary
from cloudinary.utils import cloudinary_url
from django.db import models


class CloudinaryUtilities:
    @staticmethod
    def save_image(image, public_id = None): 
        uploaded_image = cloudinary.upload(image, public_id=public_id)
        return uploaded_image
    
    @staticmethod
    def destroy_image(public_id):
        response = cloudinary.destroy(public_id)
        return response.get('result') == 'ok'
    
    @staticmethod
    def return_optimized_image(image):
        optimize_url, _ = cloudinary_url(image, fetch_format="auto", quality="auto")
        return optimize_url


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

