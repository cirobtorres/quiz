import os

from django.dispatch import receiver
from django.db.models.signals import post_save, pre_save

from apps.user.models import QuizUser
from apps.quiz.models import ScoreModel, QuizModel, PreferencesModel

from apps.quiz.questions.populate_db import populate_database


@receiver(post_save, sender=ScoreModel)
def calculate_average_score(sender, instance, created, **kwargs) -> None:
    if created:
        user: QuizUser = instance.score_user
        # quiz: QuizModel = instance.score_quiz
        scores: ScoreModel = ScoreModel.objects.filter(score_user=user)
        sum_scores: float = sum(
            score.get_score_percentage() for score in scores
        )
        count_quiz: int = scores.count()

        if count_quiz > 0:
            average_score: float = sum_scores / count_quiz
        else:
            average_score: int = 0

        user.score: float = average_score
        user.save()


@receiver(pre_save, sender=QuizUser)
def delete_old_avatar(sender, instance, **kwargs) -> None:
    try:
        old_avatar = QuizUser.objects.get(pk=instance.pk).avatar
    except QuizUser.DoesNotExist:
        return

    if not old_avatar == instance.avatar:
        try:
            os.remove(old_avatar.path)
        except (ValueError, FileNotFoundError):
            pass


@receiver(post_save, sender=QuizUser)
def create_quiz_user_preferences(sender, instance, created, **kwargs) -> None:
    if created:
        PreferencesModel.objects.create(
            preferences_user=instance
        )
        try:
            first_quiz = QuizModel.objects.get(pk=1)
        except QuizModel.DoesNotExist:
            populate_database()
            first_quiz = QuizModel.objects.get(pk=1)
        PreferencesModel.objects.get(
            pk=instance.pk
        ).preferences_quiz.add(first_quiz)
