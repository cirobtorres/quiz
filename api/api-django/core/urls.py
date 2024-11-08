"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.urls import path, re_path, include

urlpatterns = [
    re_path(route=r'api/user/?', view=include('apps.user.urls')),
    re_path(route=r'api/quiz/?', view=include('apps.quiz.urls')),
    re_path(route=r'api/score/?', view=include('apps.score.urls')),
    re_path(route=r'api/media-app/?', view=include('apps.media_app.urls')),
]

if settings.DEBUG:
    from django.contrib import admin
    from django.conf.urls.static import static
    
    urlpatterns += [
        *static(prefix=settings.STATIC_URL,
                document_root=settings.STATIC_ROOT),
        *static(prefix=settings.MEDIA_URL,
                document_root=settings.MEDIA_ROOT),
        path(route='api-admin/', view=admin.site.urls),
        path(route='api-auth/', view=include('rest_framework.urls')),
    ]

