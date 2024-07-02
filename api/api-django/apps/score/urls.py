from django.urls import re_path
from . import views

app_name = 'score'

urlpatterns = [
    re_path(route=r'^create-score/?$',view=views.ScoreCompleteView.as_view(),name='create-score'), # -> access-token
    re_path(route=r'^list-scores/?$',view=views.ScoreListView.as_view(),name='list-scores'), 
]