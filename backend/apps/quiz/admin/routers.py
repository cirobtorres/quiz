from django.conf import settings


if settings.DEBUG:
    from rest_framework.routers import DefaultRouter
    from .viewsets import (
        QuizModelViewSet,
        QuestionModelViewSet,
        AnswerModelViewSet,
        ScoreModelViewSet,
        PreferencesModelViewSet,
    )

    router = DefaultRouter()

    router.register(
        prefix=r'api-quiz',
        viewset=QuizModelViewSet,
        basename='api-quiz'
    )
    router.register(
        prefix=r'api-question',
        viewset=QuestionModelViewSet,
        basename='api-question'
    )
    router.register(
        prefix=r'api-answer',
        viewset=AnswerModelViewSet,
        basename='api-answer'
    )
    router.register(
        prefix=r'api-score',
        viewset=ScoreModelViewSet,
        basename='api-score'
    )
    router.register(
        prefix=r'api-preferences',
        viewset=PreferencesModelViewSet,
        basename='api-preferences'
    )
