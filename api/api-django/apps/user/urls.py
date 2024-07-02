from django.urls import re_path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from . import views


app_name = 'user'


urlpatterns = [
    re_path(route=r'^list/?$',view=views.UserListView.as_view(),name='list'),
    re_path(route=r'^register/?$',view=views.UserRegisterView.as_view(),name='register'),
    re_path(route=r'^token-access/?$', view=views.UserLoginView.as_view(), name='token-access'), # login
    re_path(route=r'^token-refresh/?$',view=TokenRefreshView.as_view(),name='token-refresh'), # refresh-token
    re_path(route=r'^token-verify/?$',view=TokenVerifyView.as_view(),name='token-verify'), # access-token (on body)
    re_path(route=r'^update/?$',view=views.UserUpdateView.as_view(),name='update'), # -> access-token
    re_path(route=r'^get-data/?$',view=views.UserDataView.as_view(),name='get-data'), # -> access-token
    re_path(route=r'^verify-credentials/?$',view=views.UserCredentialsVerify.as_view(),name='verify-credentials'), 
    re_path(route=r'^delete/?$',view=views.UserDeleteView.as_view(),name='delete'),  # -> access-token
]
