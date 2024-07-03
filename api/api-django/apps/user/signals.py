import os
from django.contrib.auth import get_user_model
from django.dispatch import receiver
from django.db.models.signals import post_save, pre_save

user_model = get_user_model()

@receiver(pre_save, sender=user_model)
def delete_old_avatar(sender, instance, **kwargs) -> None:
    try:
        old_avatar = user_model.objects.get(pk=instance.pk).avatar
    except user_model.DoesNotExist:
        return

    if not old_avatar == instance.avatar:
        try:
            os.remove(old_avatar.path)
        except (ValueError, FileNotFoundError):
            pass

