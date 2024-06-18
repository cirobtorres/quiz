from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from ..quiz.models import QuizModel


class QuizUserManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields) -> 'UserModel':
        if not username:
            raise ValueError('User must have an username')

        username = AbstractBaseUser.normalize_username(username)
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, password, **extra_fields) -> 'UserModel':
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have "is_staff=True"')

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have "is_superuser=True"')

        return self.create_user(username, password, **extra_fields)


class UserModel(AbstractBaseUser, PermissionsMixin):
    objects = QuizUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    username = models.CharField(max_length=32, unique=True)
    avatar = models.ImageField(upload_to='images/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.username
    
    def get_total_score(self) -> float:
        scores = self.score.all()
        sum_scores = sum(score.get_score_percentage() for score in scores)
        quizes_completed = scores.count()

        if quizes_completed > 0:
            return round(sum_scores / quizes_completed, 1)
        else:
            return 0.0


class ScoreModel(models.Model):
    quiz = models.ForeignKey(to=QuizModel, related_name='score', on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(to=UserModel, related_name='score', on_delete=models.CASCADE, null=True)
    total = models.PositiveIntegerField(default=0) # Total questions 
    corrects = models.PositiveIntegerField(default=0) # Total correct questions 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f'Corrects: {self.get_score_percentage()} Quiz: {self.quiz}'

    def get_score_percentage(self) -> float | None:
        return (self.corrects / self.total * 100) if self.total > 0 else None


class UserSettings(models.Model):
    quiz = models.ManyToManyField(to=QuizModel)
    user = models.OneToOneField(to=UserModel, related_name='settings', on_delete=models.CASCADE, null=True)
    quiz_size = models.PositiveIntegerField(default=10) # Number of questions per quiz
    time_to_answer = models.PositiveIntegerField(default=30)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f'User: {self.user}'




