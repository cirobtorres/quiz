from random import shuffle, seed
from datetime import datetime

from django.db import models
from django.contrib.auth import get_user_model

from apps.user.models import QuizUser


class QuizModel(models.Model):
    subject: str = models.CharField(max_length=65)
    slug: str = models.SlugField(max_length=115, unique=True)
    created_at: datetime = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.subject


class QuestionModel(models.Model):
    question_quiz: QuizModel = models.ForeignKey(
        to=QuizModel,
        related_name='questions',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    question_text: str = models.CharField(max_length=135)

    def __str__(self) -> str:
        return self.question_text

    def get_shuffled_answers(self, seed_number: int | None = None) -> list['AnswerModel']:
        answers_list: list[AnswerModel] = list(self.answer.all())
        seed(seed_number)
        shuffle(answers_list)

        shuffled_answers: list[str] = list()

        for answer in answers_list:
            shuffled_answers.append(
                {
                    'id': answer.id,
                    'answer_text': answer.answer_text,
                    'is_correct': answer.is_correct,
                }
            )

        return shuffled_answers

    def get_correct_answer(self) -> str:
        return self.answer.get(is_correct=True).answer_text


class AnswerModel(models.Model):
    answer_question = models.ForeignKey(
        to=QuestionModel,
        related_name='answer',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    answer_text: str = models.CharField(max_length=105)
    is_correct: bool = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.answer_text


class ScoreModel(models.Model):
    score_user: QuizUser = models.ForeignKey(
        to=get_user_model(),
        related_name='score_user',
        on_delete=models.CASCADE,
        null=True,
    )
    score_quiz: QuizModel = models.ForeignKey(
        to=QuizModel,
        related_name='score_quiz',
        on_delete=models.CASCADE,
        null=True,
    )
    total_questions: int = models.PositiveIntegerField(default=0)
    total_correct_answers: int = models.PositiveIntegerField(default=0)
    created_at: datetime = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f'Corrects: {self.get_score_percentage()} Quiz: {self.score_quiz}'

    def get_score_percentage(self) -> float | None:
        return (
            self.total_correct_answers /
            self.total_questions * 100
        ) if self.total_questions > 0 else None


class PreferencesModel(models.Model):
    preferences_user: QuizUser = models.OneToOneField(
        to=get_user_model(),
        related_name='preferences_user',
        on_delete=models.CASCADE,
        null=True,
    )
    preferences_quiz: QuizModel = models.ManyToManyField(
        to=QuizModel,
    )
    question_number: int = models.PositiveIntegerField(default=10)
    time_to_answer: int = models.PositiveIntegerField(default=30)
    updated_at: datetime = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f'User: {self.preferences_user}'
