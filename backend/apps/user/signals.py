from django.dispatch import receiver
from django.db.models.signals import post_save

from apps.user.models import QuizUser
from apps.quiz.models import ScoreModel, QuizModel


@receiver(post_save, sender=ScoreModel)
def calculate_average_score(sender, instance, created, **kwargs) -> None:
    if created:
        user: QuizUser = instance.score_user
        quiz: QuizModel = instance.score_quiz
        scores: ScoreModel = ScoreModel.objects.filter(
            score_user=user,
            score_quiz=quiz,
        )
        sum_scores: float = sum(
            score.get_score_percentage() for score in scores
        )
        count_quiz: int = scores.count()

        if count_quiz > 0:
            average_score: float = sum_scores / count_quiz
        else:
            average_score: int = 0

        user.score: float | int = average_score
        user.save()
