from django.urls import re_path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from .views import UserLoginView, UserRegisterView, UserUpdateView, UserDataView, UserDeleteView, CompleteQuizView, UserListView, ScoreListView


app_name = 'user'


urlpatterns = [
    re_path(route=r'^list/?$',view=UserListView.as_view(),name='list'),
    re_path(route=r'^register/?$',view=UserRegisterView.as_view(),name='register'),
    re_path(route=r'^token-access/?$', view=UserLoginView.as_view(), name='token-access'), # login
    re_path(route=r'^token-refresh/?$',view=TokenRefreshView.as_view(),name='token-refresh'), # refresh-token
    re_path(route=r'^token-verify/?$',view=TokenVerifyView.as_view(),name='token-verify'), # access-token (on body)
    re_path(route=r'^update/?$',view=UserUpdateView.as_view(),name='update'), # -> access-token
    re_path(route=r'^get-data/?$',view=UserDataView.as_view(),name='get-data'), # -> access-token
    re_path(route=r'^delete/?$',view=UserDeleteView.as_view(),name='delete'),  # -> access-token
    re_path(route=r'^complete-quiz/?$',view=CompleteQuizView.as_view(),name='complete-quiz'), # -> access-token
    re_path(route=r'^list-scores/?$',view=ScoreListView.as_view(),name='list-scores'), 
]
