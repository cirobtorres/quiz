import json

from django.conf import settings
from django.http import HttpRequest
from django.db.models import QuerySet, Sum, Subquery, OuterRef
from django.utils import timezone
from django.contrib.auth import get_user_model, authenticate, logout
from django.forms.models import model_to_dict


from rest_framework import status
from rest_framework.authentication import SessionAuthentication
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import MultiPartParser, FileUploadParser, JSONParser, FormParser
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import QuizUser
from .serializers import QuizUserSerializer
from .validators import QuizUserValidator


class QuizUserRegisterView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = []
    serializer_class = QuizUserSerializer
    model: QuizUser = get_user_model()
    http_method_names = ['post']
    validator = QuizUserValidator

    def post(self, request: HttpRequest, *args, **kwargs) -> Response:
        username: str = request.data.get('username')
        password: str = request.data.get('password')

        if not all([username, password]):
            return Response(
                data={'message': 'missing fields'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            self.validator(request.data)
        except Exception as e:
            print(e)
            return Response(
                data={'message': 'invalid data'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if self.model.objects.filter(username=username).exists():
            return Response(
                data={'message': 'user already exists'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user_serializer: QuizUserSerializer = \
            self.serializer_class(data=request.data)

        if user_serializer.is_valid():
            user_serializer.save()
            return Response(
                data={'message': 'user created successfully'},
                status=status.HTTP_201_CREATED
            )

        return Response(
            data={
                'message': 'invalid serializer',
                'errors': user_serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )


class QuizUserUpdateView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = QuizUserSerializer
    model: QuizUser = get_user_model()
    parser_classes = (MultiPartParser,)
    http_method_names = ['put']

    def get_object(self, pk: int, *args, **kwargs) -> QuizUser:
        return self.model.objects.get(pk=pk)

    def put(self, request: HttpRequest, pk: int, *args, **kwargs) -> Response:

        try:
            user: QuizUser = self.get_object(pk)
        except self.model.DoesNotExist:
            return Response(
                data={'message': 'user not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        if user.pk != request.user.pk:
            return Response(
                data={'message': 'unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        try:
            data = request.data.copy()

            for field in request.data:
                if data[field] == "":
                    del data[field]
        except Exception as e:
            return Response(
                data={'message': 'invalid fetch data'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user_serializer: QuizUserSerializer = self.serializer_class(
            instance=user, data=data, partial=True
        )

        if user_serializer.is_valid():
            user_serializer.save()

            new_user = user_serializer.instance

            refresh = RefreshToken.for_user(new_user)
            access = AccessToken.for_user(new_user)

            access['userData'] = {
                'id': new_user.id,
                'username': new_user.username,
                'avatar': new_user.avatar.url if new_user.avatar else None,
                'preferences_user': new_user.preferences_user.id,
                'get_total_correct_answers': new_user.get_total_correct_answers(),
                'score': new_user.score,
                'is_active': new_user.is_active,
                'is_staff': new_user.is_staff,
                'last_login': (
                    timezone.localtime(new_user.last_login)
                    .strftime("%d-%m-%Y %H:%M:%S")
                    if new_user.last_login else None
                ),
                'created_at': (
                    timezone.localtime(new_user.created_at)
                    .strftime("%d-%m-%Y %H:%M:%S")
                ),
                'updated_at': (
                    timezone.localtime(new_user.updated_at)
                    .strftime("%d-%m-%Y %H:%M:%S")
                ),
            }

            # refresh['userData'] = access['userData'].copy()
            refresh['userData'] = access['userData']

            return Response(
                data={
                    'access': str(access),
                    'refresh': str(refresh),
                },
                status=status.HTTP_200_OK
            )

        return Response(
            data=user_serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class QuizUserListView(APIView):
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination
    serializer_class = QuizUserSerializer
    model: QuizUser = get_user_model()
    http_method_names = ['get']

    def get_queryset(self, *args, **kwargs) -> QuerySet[QuizUser | None]:
        """
        If you wanna sort by multiple fields, you must pass a tuple of strings through the 'order_by' parameter.
        'order_by' must either be a single 'str' that represents a field or a 'tuple' of 'str' fields in it.
        IT DOES NOT WORK FOR LISTS! (FieldError).
        """
        queryset: QuerySet[QuizUser | None] = self.model.objects.all()
        if kwargs.get('order_by'):
            order_by = kwargs.get('order_by')
            if type(order_by) == tuple:
                return queryset.order_by(*order_by)  # if tuple
            return queryset.order_by(order_by)  # if string
        return queryset

    def get(self, request: HttpRequest, *args, **kwargs) -> Response:

        page = request.query_params.get('page', 1)
        page_size = request.query_params.get('page_size', 10)

        paginator = self.pagination_class()
        paginator.page_size = page_size

        queryset: QuerySet[QuizUser | None] = self.get_queryset(
            order_by=(
                '-score',
                'username',
            )
        )
        results = paginator.paginate_queryset(queryset, request)
        serializer = self.serializer_class(results, many=True)

        data = {
            'results': serializer.data,
            'paginator': {
                'current': int(page),
                'first': 1,
                'last': int(paginator.page.paginator.count),
                'page_size': int(paginator.page_size),
                'total_pages': paginator.page.paginator.num_pages,
                'previous': (
                    paginator.get_previous_link()
                    if paginator.get_previous_link() else None
                ),
                'next': (
                    paginator.get_next_link()
                    if paginator.get_next_link() else None
                ),
            }
        }

        return Response(data)
