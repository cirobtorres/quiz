from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from ..media_app.models import UserImageModel


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


class UserModel(AbstractBaseUser, PermissionsMixin):
    objects = QuizUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    username = models.CharField(max_length=32, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    avatar = models.OneToOneField(to=UserImageModel, related_name='user', on_delete=models.SET_NULL, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str: 
        return self.username 


class UserSettingsModel(models.Model):
    user = models.OneToOneField(to=UserModel, related_name='settings', on_delete=models.CASCADE, blank=True, null=True)
    quiz_size = models.PositiveIntegerField(default=10) # Number of questions per quiz
    time_to_answer = models.PositiveIntegerField(default=30)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f'User: {self.user.username}'

