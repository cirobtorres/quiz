from django.apps import AppConfig
from django.db.models.signals import post_migrate

def startup_database(**kwargs):
    from .models import QuizModel
    from .questions.populate_database import populate_database
    if not QuizModel.objects.exists(): # One time start-up after migration
        populate_database()

class QuizConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.quiz'

    def ready(self):
        import apps.quiz.signals
        post_migrate.connect(startup_database, sender=self)

