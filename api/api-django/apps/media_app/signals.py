import os
from django.dispatch import receiver
from django.db.models.signals import pre_save, pre_delete
import cloudinary.uploader as cloudinary_api
from .models import UserImageModel, QuizImageModel


# @receiver(pre_save, sender=UserImageModel)
# def delete_old_avatar_before_save_new_one(sender, instance, **kwargs) -> None:
#     try:
#         old_avatar = UserImageModel.objects.get(pk=instance.pk).avatar
#     except UserImageModel.DoesNotExist:
#         return

#     if old_avatar != instance.avatar:
#         try:
#             UserImageModel.destroy_image(old_avatar)
#         except (ValueError, FileNotFoundError):
#             pass


# @receiver(pre_delete, sender=UserImageModel)
# def delete_old_avatar_before_delete_model(sender, instance, **kwargs) -> None:
#     try:
#         user_avatar = UserImageModel.objects.get(pk=instance.pk)
#     except UserImageModel.DoesNotExist:
#         return

#     try:
#         UserImageModel.destroy_image(user_avatar.public_id)
#         # user_avatar.delete() # No need because of user cascade when he gets deleted 
#     except (ValueError, FileNotFoundError):
#         pass


@receiver(pre_save, sender=QuizImageModel)
def delete_old_cover_before_save_new_one(sender, instance, **kwargs) -> None:
    try:
        old_cover = QuizImageModel.objects.get(pk=instance.pk)
    except QuizImageModel.DoesNotExist:
        return

    if old_cover != instance.cover:
        try:
            os.remove(old_cover.path)
        except (ValueError, FileNotFoundError):
            pass


@receiver(pre_delete, sender=QuizImageModel)
def delete_old_cover_before_delete_model(sender, instance, **kwargs) -> None:
    try:
        quiz_cover = QuizImageModel.objects.get(pk=instance.pk).cover
    except QuizImageModel.DoesNotExist:
        return

    try:
        UserImageModel.destroy_image(quiz_cover.public_id)
        # quiz_cover.delete() # No need because of quiz cascade when he gets deleted 
    except (ValueError, FileNotFoundError):
        pass

