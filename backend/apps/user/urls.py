from django.conf import settings
from django.urls import re_path

from .views import (
    QuizUserRegisterView,
    QuizUserUpdateView,
    QuizUserListView,
    QuizUserRetrieveView,
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
    # re_path(
    #     route=r'^ranking/(?P<page>\d+)/?$',
    #     view=QuizUserListView.as_view(),
    #     name='ranking'
    # ),
    re_path(
        route=r'^retrieve-username/(?P<username>\w+)/?$',
        view=QuizUserRetrieveView.as_view(),
        name='retrieve_username'
    )
]

if settings.DEBUG:
    from .admin import router
    urlpatterns += router.urls
