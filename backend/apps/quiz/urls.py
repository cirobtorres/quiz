from django.conf import settings
from django.urls import re_path

from .views import (
    LoadQuestions,
    LoadScore,
    ListQuizes,
    LoadPreferences,
)


app_name = 'quiz'

urlpatterns = [
    re_path(
        route=r'^question(?:/(?P<pk>\d+))?/?$',
        view=LoadQuestions.as_view(),
        name='questions',
    ),
    re_path(
        route=r'^score(?:/(?P<pk>\d+))?/?$',
        view=LoadScore.as_view(),
        name='score',
    ),
    re_path(
        route=r'^quiz-list/?$',
        view=ListQuizes.as_view(),
        name='quiz',
    ),
    re_path(
        route=r'^preferences(?:/(?P<pk>\d+))?/?$',
        view=LoadPreferences.as_view(),
        name='preferences',
    ),
    re_path(
        route=r'^preferences/update(?:/(?P<pk>\d+))?/?$',
        view=LoadPreferences.as_view(),
        name='preferences_update',
    ),
]

if settings.DEBUG:
    from .admin import router
    urlpatterns += router.urls

    from django.http import HttpRequest

    from rest_framework.reverse import reverse as api_reverse
    from rest_framework.views import APIView
    from rest_framework.response import Response

    class RedirectAPI(APIView):
        def get(self, request: HttpRequest, format=None):
            quiz_urls = {
                'quiz': f"http://127.0.0.1:8000{api_reverse(viewname='quiz:api-quiz-list')}?page=1",
                'questions': f"http://127.0.0.1:8000{api_reverse(viewname='quiz:api-question-list')}?page=1",
                'answers': f"http://127.0.0.1:8000{api_reverse(viewname='quiz:api-answer-list')}?page=1",
                'score': f"http://127.0.0.1:8000{api_reverse(viewname='quiz:api-score-list')}?page=1",
                'preferences': f"http://127.0.0.1:8000{api_reverse(viewname='quiz:api-preferences-list')}?page=1",
            }
            return Response(data=quiz_urls)

    urlpatterns += [
        re_path(
            route=r'^quiz-viewsets$',
            view=RedirectAPI.as_view(),
            name='quiz_viewsets'
        ),
    ]
