from django.conf import settings
from random import seed, shuffle
from django.db import models
from django.utils.text import slugify
from ..media_app.models import QuizCoverModel
from ..user.models import UserSettingsModel


QUIZ_MODERATION = settings.QUIZ_MODERATION


class QuizModel(models.Model):
    user = models.ForeignKey(to=UserSettingsModel, related_name='quiz', on_delete=models.SET_NULL, blank=True, null=True)
    subject = models.CharField(max_length=65)
    description = models.CharField(max_length=155)
    cover = models.OneToOneField(to=QuizCoverModel, related_name='quiz', on_delete=models.SET_NULL,  blank=True, null=True)
    slug = models.SlugField(max_length=255, unique=True)
    blocked = models.BooleanField(default=QUIZ_MODERATION) # True on production 
    is_private = models.BooleanField(default=False) # Switched on/off on the user counterpart 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.subject
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.subject)
        super().save(*args, **kwargs)


class QuestionModel(models.Model):
    quiz = models.ForeignKey(to=QuizModel, related_name="questions", on_delete=models.SET_NULL, null=True, blank=True)
    text = models.CharField(max_length=400) # TODO: change max_length to 135 in the future
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.text
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.quiz.updated_at = self.updated_at
        self.quiz.save()
    
    def get_shuffled_answers(self, seed_number: int = None) -> 'list[AnswerModel]':
        """
        Returns a list of objects. Each object is an exact representation of each answer option from a specific question model
        """
        # Convert QuerySet[AnswerModel] to list[AnswerModel] so it can be shuffled by random.shuffle method
        answer_list = [answer for answer in self.answers.all()]

        seed(seed_number)
        shuffle(answer_list)

        # Convert list[AnswerModel] to list[dict] so django might serialize it in a JSON format
        return [
            {
                'id': answer.id, 
                'text': answer.text, 
                'is_correct': answer.is_correct
            } for answer in answer_list
        ]


class AnswerModel(models.Model):
    question = models.ForeignKey(to=QuestionModel, related_name='answers', on_delete=models.CASCADE, null=True, blank=True)
    text = models.CharField(max_length=155) # TODO: change max_length to 65 in the future
    is_correct = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.text

