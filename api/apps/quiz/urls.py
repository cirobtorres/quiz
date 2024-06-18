from django.urls import re_path
from . import views

app_name = 'quiz'

urlpatterns = [
    re_path(route=r'^(?:(?P<pk>\d+))?/?$',view=views.QuizView.as_view(),name='quiz',),
    re_path(route=r'^question(?:/(?P<pk>\d+))?/?$',view=views.QuestionView.as_view(),name='question',),
    re_path(route=r'^answer(?:/(?P<pk>\d+))?/?$',view=views.AnswerView.as_view(),name='answer',),
]