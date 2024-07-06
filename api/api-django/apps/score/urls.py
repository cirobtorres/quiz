from django.urls import re_path
from . import views

app_name = 'score'

urlpatterns = [
    re_path(route=r'^(?:(?P<pk>\d+))?/?$',view=views.ScoreView.as_view(),name='score'), # -> access-token
]