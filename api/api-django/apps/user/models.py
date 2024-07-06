from django.conf import settings
from django.db import models
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from ..quiz.models import QuizModel


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
    avatar = models.ImageField(upload_to='user/avatar' if not DEBUG else 'user/devMode', blank=True, null=True)
    settings = models.OneToOneField(to=UserSettingsModel, related_name='user', on_delete=models.CASCADE, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.username
    
    def get_score(self) -> float:
        scores = self.total_score.all()
        sum_scores = sum(score.get_score() for score in scores)
        quizes_completed = scores.count()

        if quizes_completed > 0:
            return round(sum_scores / quizes_completed, 1)
        else:
            return 0.0
    
    def get_last_score_id(self) -> int | None:
        try:
            return self.total_score.latest('id').id
        except ObjectDoesNotExist as e:
            return None
    
    def get_avatar_url(self) -> str:
        if self.avatar:
            return self.avatar.url
        return None

