from cloudinary.uploader import upload as cloudinary_upload
from cloudinary.utils import cloudinary_url
from cloudinary.models import CloudinaryField
from django.conf import settings
from django.db import models
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.contrib.auth.hashers import make_password
from ..quiz.models import QuizModel
from ..media_app.models import UserImageModel


DEBUG = settings.DEBUG


class QuizUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields) -> 'UserModel':
        if not username:
            raise ValueError('User must have an username')
        if not email:
            raise ValueError('User must have an email')

        username = AbstractBaseUser.normalize_username(username)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, email, password, **extra_fields) -> 'UserModel':
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have "is_staff=True"')

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have "is_superuser=True"')

        return self.create_user(username, email, password, **extra_fields)


class UserSettingsModel(models.Model):
    quiz = models.ManyToManyField(to=QuizModel)
    quiz_size = models.PositiveIntegerField(default=10) # Number of questions per quiz
    time_to_answer = models.PositiveIntegerField(default=30)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f'User: {self.user.username}'


class UserModel(AbstractBaseUser, PermissionsMixin):
    objects = QuizUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    username = models.CharField(max_length=32, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    avatar = models.ForeignKey(to=UserImageModel, related_name='user', on_delete=models.CASCADE, blank=True, null=True)
    settings = models.OneToOneField(to=UserSettingsModel, related_name='user', on_delete=models.CASCADE, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str: 
        return self.username 
    
    def get_score_percentage(self) -> float:
        scores = self.scores.all()
        all_time_quiz_completed = scores.count()

        if all_time_quiz_completed > 0:
            sum_all_scores = sum(score.get_score_percentage() for score in scores)
            return round(sum_all_scores / all_time_quiz_completed, 1)
        else:
            return 0.0
    
    def get_last_score_id(self) -> int | None:
        try:
            return self.scores.latest('id').id
        except ObjectDoesNotExist as e:
            return None

