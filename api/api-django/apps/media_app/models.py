import base64
from django.core.files.uploadedfile import InMemoryUploadedFile
from cloudinary.models import CloudinaryField
import cloudinary.uploader as cloudinary
from cloudinary.utils import cloudinary_url
from django.db import models


class CloudinaryUtilities:
    @staticmethod
    def convert_to_base64(file: InMemoryUploadedFile):
        file_content = file.read() # Read file content in bytes
        file_base64 = base64.b64encode(file_content).decode('utf-8') # Bytes -> base64
        base64_str = f"data:{file.content_type};base64,{file_base64}" # Prefix for base64
        return base64_str
    
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

    def __str__(self) -> str:
        return self.filename


class QuizCoverModel(models.Model):
    asset_id = models.CharField(max_length=255, unique=True)
    public_id = models.CharField(max_length=255, unique=True)
    filename = models.CharField(max_length=255)
    secure_url = models.CharField(max_length=255)
    url = models.CharField(max_length=255)
    format = models.CharField(max_length=255)
    width = models.CharField(max_length=255)
    height = models.CharField(max_length=255)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.filename

