from django.urls import re_path, path

from .views import LoadQuestions, LoadScore, ListQuizes


app_name = 'quiz'

urlpatterns = [
    re_path(route=r'^question(?:/(?P<pk>\d+))?/?$',
            view=LoadQuestions.as_view(), name='questions'),
    re_path(route=r'^score(?:/(?P<pk>\d+))?/?$',
            view=LoadScore.as_view(), name='score'),
    re_path(route=r'^quiz-list/?$', view=ListQuizes.as_view(), name='quiz'),
]
