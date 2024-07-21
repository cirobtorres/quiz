import os
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from django.db.models.signals import pre_save, pre_delete
import cloudinary.uploader as cloudinary
from .models import UserImageModel, QuizCoverModel


@receiver(pre_save, sender=UserImageModel)
def delete_old_image_before_save_new_one(sender, instance, **kwargs) -> None:
    try:
        old_image = UserImageModel.objects.get(pk=instance.pk)
    except UserImageModel.DoesNotExist:
        return

    if old_image.public_id != instance.public_id:
        try:
            cloudinary.destroy(old_image.public_id)
        except (ValueError, FileNotFoundError):
            pass


@receiver(pre_delete, sender=UserImageModel)
def delete_old_image_before_delete_model(sender, instance, **kwargs) -> None:
    try:
        user_image = UserImageModel.objects.get(pk=instance.pk)
    except UserImageModel.DoesNotExist:
        return

    try:
        cloudinary.destroy(user_image.public_id)
    except (ValueError, FileNotFoundError):
        pass


@receiver(pre_save, sender=QuizCoverModel)
def delete_old_cover_before_save_new_one(sender, instance, **kwargs) -> None:
    try:
        old_cover = QuizCoverModel.objects.get(pk=instance.pk)
    except QuizCoverModel.DoesNotExist:
        return

    if old_cover.public_id != instance.public_id:
        try:
            cloudinary.destroy(old_cover.public_id)
        except (ValueError, FileNotFoundError):
            pass


@receiver(pre_delete, sender=QuizCoverModel)
def delete_old_cover_before_delete_model(sender, instance, **kwargs) -> None:
    try:
        quiz_cover = QuizCoverModel.objects.get(pk=instance.pk)
    except QuizCoverModel.DoesNotExist:
        return

    try:
        cloudinary.destroy(quiz_cover.public_id)
    except (ValueError, FileNotFoundError):
        pass

