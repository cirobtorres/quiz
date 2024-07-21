from django.contrib.auth import get_user_model
from django.http import HttpRequest
from rest_framework.permissions import BasePermission
from rest_framework_simplejwt.tokens import AccessToken


class UserPermissions(BasePermission): 
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
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return {}
    
    def extract_payload(self):
        try:
            header = self.request.META
            authorization = header['HTTP_AUTHORIZATION']
            _, token = authorization.split(' ') # bearer, token
            user = self.validate_token(token)
            return user.payload
        
        except KeyError as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return None
    
    def has_permission(self, request: HttpRequest, view):
        header = request.META
        authorization = header['HTTP_AUTHORIZATION']
        _, token = authorization.split(' ') # bearer, token

        user = self.validate_token(token)
        
        if user:
            return True

        return False


class UserUtilities(UserPermissions):
    user_model = get_user_model()

    def exists(self, **kwargs) -> bool:
        return self.user_model.objects.filter(**kwargs).exists()

    def get_object(self, **kwargs):
        """
        Raises ObjectDoesNotExist exception if an object is not found
        """
        return self.user_model.objects.get(**kwargs)

    def get_queryset(self, **kwargs):
        """
        kwargs:
            - order_by
        
        Ex: Sorting by a single field:
            >>> get_queryset(order_by='id')
        
        Ex: Sorting by multiple fields:
            >>> get_queryset(order_by=('id', 'username', 'last_login'))
            >>> get_queryset(order_by=['id', 'username', 'last_login'])
        """
        queryset = self.user_model.objects.all()
        if kwargs.get('order_by'):
            order_by = kwargs.get('order_by')
            if hasattr(order_by, '__iter__'):
                return queryset.order_by(*tuple(order_by)) 
            return queryset.order_by(order_by) 
        return queryset
    
    def get_user(self):
        """
        Raises AttributeError if token is expired, doesn't exist or is invalid 
        Raises ObjectDoesNotExist if no user is found 
        """
        user_model = self.extract_payload()
        user_id = user_model.get('user_id')
        return self.get_object(pk=user_id)

