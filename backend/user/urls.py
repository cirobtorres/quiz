from django.conf import settings
from django.urls import re_path

from .views import (
    QuizUserRegisterView,
    QuizUserUpdateView,
    QuizUserListView,
)

app_name = 'user'

urlpatterns = [
    re_path(
        route=r'^register/?$',
        view=QuizUserRegisterView.as_view(),
        name='register'
    ),
    re_path(
        route=r'^update/(?P<pk>\d+)/?$',
        view=QuizUserUpdateView.as_view(),
        name='update'
    ),
    re_path(
        route=r'^ranking/?$',
        view=QuizUserListView.as_view(),
        name='ranking'
    ),
]

if settings.DEBUG:
    from .admin import router
    urlpatterns += router.urls
