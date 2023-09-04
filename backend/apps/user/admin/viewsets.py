from django.conf import settings

if settings.DEBUG:
    from django.http import HttpRequest
    from django.db.models import QuerySet
    from django.contrib.auth import get_user_model

    from rest_framework.viewsets import ModelViewSet
    from rest_framework.authentication import SessionAuthentication
    from rest_framework.permissions import IsAuthenticatedOrReadOnly
    from rest_framework.pagination import PageNumberPagination
    from rest_framework.response import Response
    from rest_framework.status import (
        HTTP_200_OK,
        HTTP_201_CREATED,
        HTTP_400_BAD_REQUEST,
        HTTP_404_NOT_FOUND,
    )

    from ..models import QuizUser
    from .admin_serializers import QuizUserAdminSerializer

    class QuizUserModelViewSet(ModelViewSet):
        """
        Friendly API navigation view for django rest framework browsable API users
        Do not build around this modelvieset nor build functionalities with this in production
        """
        authentication_classes = [SessionAuthentication]
        permission_classes = [IsAuthenticatedOrReadOnly]
        pagination_class = PageNumberPagination
        serializer_class = QuizUserAdminSerializer
        model: QuizUser = get_user_model()
        http_method_names = ['get', 'post', 'put',
                             'patch', 'delete', 'head', 'options']

        def get_object(self, pk: str, **kwargs) -> QuizUser | None:
            try:
                return self.model.objects.get(pk=pk)
            except self.model.DoesNotExist:
                return None

        def get_queryset(self, **kwargs) -> QuerySet[QuizUser | None]:
            if kwargs:
                if kwargs.get('is_staff', False):
                    return self.model.objects.filter(is_staff=True)
                if kwargs.get('is_active', False):
                    return self.model.objects.filter(is_active=True)
            return self.model.objects.all()

        def list(self, request: HttpRequest, **kwargs) -> Response:
            users: QuerySet[QuizUser | None] = self.get_queryset(**kwargs)
            if users.exists():
                paginator = self.pagination_class()
                page = paginator.paginate_queryset(users, request)
                users_serializer: QuizUserAdminSerializer = self.serializer_class(
                    instance=page, many=True, context={'request': request})
                return paginator.get_paginated_response(users_serializer.data)
            print('-' * 50, users)
            return Response(data={'message': 'not found'}, status=HTTP_404_NOT_FOUND)

        def retrieve(self, request: HttpRequest, pk: str = None, **kwargs) -> Response:
            user: QuizUser | None = self.get_object(pk, **kwargs)
            if user is None:
                return Response(data={'message': 'not found'}, status=HTTP_404_NOT_FOUND)
            user_serializer: QuizUserAdminSerializer = self.serializer_class(
                instance=user, context={'request': request})
            return Response(data=user_serializer.data, status=HTTP_200_OK)

        def create(self, request: HttpRequest, **kwargs) -> Response:
            user_serializer: QuizUserAdminSerializer = self.serializer_class(
                data=request.data)
            if user_serializer.is_valid():
                user_serializer.save()
                return Response(data=user_serializer.data, status=HTTP_201_CREATED)
            return Response(data={'message': user_serializer.errors}, status=HTTP_400_BAD_REQUEST)

        def update(self, request: HttpRequest, pk: str = None, **kwargs) -> Response:
            user: QuizUser | None = self.get_object(pk, **kwargs)
            if user is None:
                return Response(data={'message': 'not found'}, status=HTTP_404_NOT_FOUND)
            user_serializer: QuizUserAdminSerializer = self.serializer_class(
                instance=user, data=request.data, partial=True, context={'request': request})
            if user_serializer.is_valid():
                user_serializer.save()
                return Response(data=user_serializer.data, status=HTTP_200_OK)
            return Response(data=user_serializer.errors, status=HTTP_400_BAD_REQUEST)

        def destroy(self, request: HttpRequest, pk: str = None, **kwargs) -> Response:
            user: QuizUser | None = self.get_object(pk, **kwargs)
            if user is None:
                return Response(data={'message': 'not found'}, status=HTTP_404_NOT_FOUND)
            username: str = user.username
            user.delete()
            return Response(data={'message': f'user {username} deleted'}, status=HTTP_200_OK)

        def partial_update(self, request: HttpRequest, pk: str = None, **kwargs) -> Response:
            user: QuizUser | None = self.get_object(pk, **kwargs)
            if user is None:
                return Response(data={'message': 'not found'}, status=HTTP_404_NOT_FOUND)
            user_serializer: QuizUserAdminSerializer = self.serializer_class(
                instance=user, data=request.data, partial=True)
            if user_serializer.is_valid():
                user_serializer.save()
                return Response(data=user_serializer.data, status=HTTP_200_OK)
            return Response(data=user_serializer.errors, status=HTTP_400_BAD_REQUEST)
