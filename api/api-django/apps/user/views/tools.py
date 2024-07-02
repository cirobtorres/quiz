from datetime import *
from typing import TypedDict, NewType, Dict, Any
from django.contrib.auth import get_user_model
from django.db.models import QuerySet
from django.http import HttpRequest
from rest_framework.permissions import BasePermission
from rest_framework.status import (
    HTTP_200_OK, 
    HTTP_401_UNAUTHORIZED, 
    HTTP_404_NOT_FOUND, 
    HTTP_500_INTERNAL_SERVER_ERROR
)
from rest_framework.pagination import PageNumberPagination
from rest_framework_simplejwt.tokens import AccessToken
from ..serializers import UserSerializer
from ..validators import UserValidator
from ...score.serializers import TotalScoreSerializer, PartialScoreSerializer
from ...score.models import TotalScoreModel, PartialScoreModel


class QuizUser(TypedDict):
    id: int
    username: str
    password: str
    avatar: Any
    is_active: bool
    is_staff: bool
    last_login: bool
    created_at: datetime
    updated_at: datetime


class UserToken:
    @staticmethod
    def validate_token(token) -> AccessToken: 
        """
        Returns an empty dictionary if invalid or an token payload if 
        """
        try:
            access_token = AccessToken(token)
            access_token.verify()
            return access_token
        except Exception as e:
            return {}
    
    def extract_payload(self):
        header = self.request.META
        authorization = header['HTTP_AUTHORIZATION']
        _, token = authorization.split(' ') # bearer, token

        user = self.validate_token(token)

        return user.payload


class UserPermissions(BasePermission): 
    def has_permission(self, request: HttpRequest, view):
        header = request.META
        authorization = header['HTTP_AUTHORIZATION']
        _, token = authorization.split(' ') # bearer, token

        user = UserToken.validate_token(token)
        
        if user:
            return True

        return False


class UserUtilities(UserToken):
    pagination_class = PageNumberPagination
    user_serializer = UserSerializer
    user_model = get_user_model()
    total_score_serializer = TotalScoreSerializer
    partial_score_serializer = PartialScoreSerializer
    total_score_model = TotalScoreModel
    partial_score_model = PartialScoreModel
    validator = UserValidator

    def exists(self, **kwargs) -> bool:
        return self.user_model.objects.filter(**kwargs).exists()

    def get_object(self, **kwargs) -> QuizUser:
        """
        Returns a single object

        Raises an exception if an object is not found
        """
        return self.user_model.objects.get(**kwargs)

    def get_queryset(self, **kwargs) -> QuerySet[QuizUser | None]:
        """
        Returns a QuerySet of QuizUsers or an empty QuerySet

        kwargs:
            - order_by
        
        Ex: Sorting by a single field:
            >>> get_queryset(order_by='id')
        
        Ex: Sorting by multiple fields:

        Correct:
            >>> get_queryset(order_by=('id', 'username', 'last_login'))

        Wrong (FieldError):
            >>> get_queryset(order_by=['id', 'username', 'last_login']) 
        """
        queryset = self.user_model.objects.all()
        if kwargs.get('order_by'):
            order_by = kwargs.get('order_by')
            if type(order_by) == tuple:
                return queryset.order_by(*order_by)  # if tuple
            return queryset.order_by(order_by)  # if string
        return queryset
    
    def get_user(self):
        user_model = self.extract_payload()
        user_id = user_model.get('user_id', None)

        if not user_id:
            return {
                'invalid': {
                    'data': {'message': 'Invalid token'}, 
                    'status': HTTP_401_UNAUTHORIZED,
                    'error': True, 
                }
            }

        try:
            return self.get_object(pk=user_id)
        except self.user_model.DoesNotExist:
            return {
                'invalid': {
                    'data': {'message': 'User not found'}, 
                    'status': HTTP_404_NOT_FOUND,
                    'error': True, 
                }
            }
    
    def paginate(self, request: HttpRequest, queryset: QuerySet, **kwargs):
        if(queryset.count()):
            
            page = request.query_params.get('page', 1)
            page_size = request.query_params.get('page_size', 10)

            paginator = self.pagination_class()
            paginator.page_size = page_size

            results = paginator.paginate_queryset(queryset, request)

            # This method is not intended to be used with combined querysets (querysets of multiple models)
            if isinstance(queryset.first(), self.user_model):
                serializer = self.user_serializer(results, many=True)

            elif isinstance(queryset.first(), self.total_score_model):
                serializer = self.total_score_serializer(results, many=True)

            else:
                return {
                    'data': {'message': 'Invalid model', 'error': True, }, 
                    'status': HTTP_500_INTERNAL_SERVER_ERROR,
                }
        
        else:
            return {
                'data': {
                    'results': {},
                    'paginator': {
                        'current': 1,
                        'first': 1,
                        'last': 1,
                        'page_size': 0,
                        'total_pages': 1,
                        'previous': None,
                        'next': None,
                    },
                    'error': False,
                }, 
                'status': HTTP_200_OK,
            }

        return { 
            'data': {
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
                },
                'error': False, 
            },
            'status': HTTP_200_OK
        }





