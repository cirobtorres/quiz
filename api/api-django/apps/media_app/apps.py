from django.apps import AppConfig


class MediaAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.media_app'

    def ready(self):
        import apps.media_app.signals

