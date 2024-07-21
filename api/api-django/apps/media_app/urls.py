from django.urls import re_path
from . import views


app_name = 'media_app'


urlpatterns = [
    re_path(route=r'^user-image/?$',view=views.UserImageView.as_view(),name='user-image'),
    re_path(route=r'^quiz-cover(?:/(?P<pk>\d+))?/?$',view=views.QuizCoverView.as_view(),name='quiz-cover'),
]
