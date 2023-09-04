from django.conf import settings


if settings.DEBUG:
    from rest_framework.routers import DefaultRouter
    from .viewsets import QuizUserModelViewSet

    router = DefaultRouter()

    router.register(
        prefix=r'api-users',
        viewset=QuizUserModelViewSet,
        basename='api-users'
    )
