from django.urls import re_path, path

from .views import Questions, Score, Quizes


app_name = 'quiz'

urlpatterns = [
    re_path(route=r'^question(?:/(?P<pk>\d+))?/?$',
            view=Questions.as_view(), name='questions'),
    re_path(route=r'^score(?:/(?P<pk>\d+))?/?$',
            view=Score.as_view(), name='score'),
    re_path(route=r'^quiz-list/?$', view=Quizes.as_view(), name='quiz'),
]
