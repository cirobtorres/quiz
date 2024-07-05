import os
from django.dispatch import receiver
from django.db.models.signals import pre_save, pre_delete
from .models import QuizModel


@receiver(pre_save, sender=QuizModel)
def delete_old_image(sender, instance, **kwargs) -> None:
    try:
        old_image = QuizModel.objects.get(pk=instance.pk).image
    except QuizModel.DoesNotExist:
        return

    if not old_image == instance.image:
        try:
            os.remove(old_image.path)
        except (ValueError, FileNotFoundError):
            pass


@receiver(pre_delete, sender=QuizModel)
def delete_image(sender, instance, **kwargs) -> None:
    try:
        quiz_image = QuizModel.objects.get(pk=instance.pk).image
    except QuizModel.DoesNotExist:
        return

    if not quiz_image == instance.image:
        try:
            os.remove(quiz_image.path)
        except (ValueError, FileNotFoundError):
            pass

