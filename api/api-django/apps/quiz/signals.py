import os
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from django.db.models.signals import pre_save, pre_delete
import cloudinary.uploader as cloudinary
from .models import QuizModel
from ..media_app.models import QuizCoverModel


@receiver(pre_delete, sender=QuizModel)
def delete_old_cover_before_delete_model(sender, instance, **kwargs) -> None:
    try:
        quiz_cover = QuizCoverModel.objects.get(pk=instance.cover.pk)
    except QuizCoverModel.DoesNotExist:
        return

    try:
        cloudinary.destroy(quiz_cover.public_id)
    except (ValueError, FileNotFoundError):
        pass

