from django.http import HttpRequest
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_401_UNAUTHORIZED, HTTP_404_NOT_FOUND
from rest_framework_simplejwt.authentication import JWTAuthentication
from .tools import UserUtilities, UserPermissions


class UserDeleteView(APIView, UserUtilities):
    authentication_classes = [JWTAuthentication]
    permission_classes = [UserPermissions]
    http_method_names = ['delete',]

    def delete(self, request: HttpRequest) -> Response:
        try:
            user_model = self.get_user()
        except AttributeError as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(data={'message': 'Invalid token'}, status=HTTP_401_UNAUTHORIZED)
        
        except ObjectDoesNotExist as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(data={'message': 'User not found'}, status=HTTP_404_NOT_FOUND)

        try:
            not_valid = user_model.get('invalid')
            if not_valid:
                return Response(**not_valid)
        
        except AttributeError as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            pass

        user_model.delete()
        
        return Response(data={'message': 'User deleted', }, status=HTTP_200_OK)

