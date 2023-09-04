from datetime import datetime

from django.contrib.auth.models import (
    BaseUserManager,
    AbstractBaseUser,
    PermissionsMixin,
)
from django.db import models
from django.db.models import Sum


class QuizUserManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields) -> 'QuizUser':

        if not username:
            raise ValueError('Users must have a username')

        username: str = AbstractBaseUser.normalize_username(username)

        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, password, **extra_fields) -> 'QuizUser':

        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have "is_staff=True"')

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have "is_superuser=True"')

        return self.create_user(username, password, **extra_fields)


class QuizUser(AbstractBaseUser, PermissionsMixin):

    objects = QuizUserManager()

    USERNAME_FIELD: str = 'username'
    REQUIRED_FIELDS: list[str] = []

    class Meta:
        verbose_name: str = 'QuizUser'
        verbose_name_plural: str = 'QuizUsers'

    username: str = models.CharField(max_length=65, unique=True)
    # avatar: str = models.ImageField(
    avatar: str = models.FileField(
        upload_to='images/', blank=True, null=True)
    is_active: bool = models.BooleanField(default=True)
    is_staff: bool = models.BooleanField(default=False)
    created_at: datetime = models.DateTimeField(auto_now_add=True)
    updated_at: datetime = models.DateTimeField(auto_now=True)
    score: float = models.FloatField(default=0)

    def __str__(self) -> str:
        return self.username

    def get_total_correct_answers(self) -> int:
        return self.score_user.aggregate(Sum('total_correct_answers'))\
            .get('total_correct_answers__sum') if self.score_user.exists() else 0
