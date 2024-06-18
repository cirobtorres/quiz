from django.contrib.auth import get_user_model
from django.dispatch import receiver
from django.db.models.signals import post_save, pre_save


@receiver(pre_save, sender=get_user_model())
def delete_old_avatar(sender, instance, **kwargs) -> None:
    pass