from django.conf import settings
from django.http import HttpRequest
from django.urls import path, include, reverse

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path(route='api/quiz/', view=include('apps.quiz.urls')),
    path(route='api/user/', view=include('apps.user.urls')),
    path(route='api/token/access', view=TokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path(route='api/token/refresh',
         view=TokenRefreshView.as_view(), name='token_refresh'),
]

if settings.DEBUG:
    from django.contrib import admin
    from django.conf.urls.static import static
    from rest_framework.views import APIView
    from rest_framework.response import Response

    class RedirectAPI(APIView):
        def get(self, request: HttpRequest, format=None):
            redirect_urls = {
                "users": f"http://127.0.0.1:8000{reverse(viewname='user:api-users-list')}?page=1",
                "questions": f"http://127.0.0.1:8000{reverse(viewname='quiz:questions')}",
                "score": f"http://127.0.0.1:8000{reverse(viewname='quiz:score')}",
            }
            return Response(data=redirect_urls)

    urlpatterns += [
        *static(prefix=settings.STATIC_URL,
                document_root=settings.STATIC_ROOT),
        *static(prefix=settings.MEDIA_URL,
                document_root=settings.MEDIA_ROOT),
        path(route='', view=RedirectAPI.as_view()),
        path(route='admin/', view=admin.site.urls),
        path(route='api-auth/', view=include('rest_framework.urls')),
    ]
