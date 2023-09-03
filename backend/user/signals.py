from django.dispatch import receiver
from django.db.models.signals import post_save

from quiz.models import ScoreModel


@receiver(post_save, sender=ScoreModel)
def calculate_average_score(sender, instance, created, **kwargs):
    if created:
        user = instance.quiz_user
        quiz_scores = ScoreModel.objects.filter(
            quiz_user=user,
            quiz=instance.quiz
        )
        total_score = sum(
            score.get_score_percentage() for score in quiz_scores
        )
        quiz_count = quiz_scores.count()

        if quiz_count > 0:
            average_score = total_score / quiz_count
        else:
            average_score = 0

        total_correct_answers = sum(
            score.total_correct_answers for score in quiz_scores
        )  # TODO: remove this field

        user.total_correct_answers = total_correct_answers  # TODO: remove this field

        user.score = average_score
        user.save()
