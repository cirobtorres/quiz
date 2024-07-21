from django.http import HttpRequest
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED, HTTP_404_NOT_FOUND
from rest_framework.parsers import JSONParser
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from .tools import UserUtilities, UserPermissions
from ..validators import UserValidator


class UserUpdateView(APIView, UserUtilities): 
    authentication_classes = [JWTAuthentication] 
    permission_classes = [UserPermissions] 
    parser_classes = (JSONParser,) 
    http_method_names = ['put',] 

    def put(self, request: HttpRequest) -> Response: 
        try:
            user_model = self.get_user()
        except AttributeError as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(data={'message': 'Invalid token'}, status=HTTP_401_UNAUTHORIZED)
        
        except ObjectDoesNotExist as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(data={'message': 'User not found'}, status=HTTP_404_NOT_FOUND)

        try: # TODO: rework this method
            not_valid = user_model.get('invalid') 
            if not_valid: 
                return Response(**not_valid) 
        
        except AttributeError as e: 
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            pass

        try:
            UserValidator(request.data)

            for field in request.data: 
                if request.data[field] in ["", "is_active", "is_staff"]: # Security 
                    del request.data[field] 
                try:
                    if getattr(user_model, field):
                        if field == 'password':
                            user_model.set_password(getattr(user_model, field))
                        else:
                            setattr(user_model, field, request.data[field])
                except AttributeError as e:
                    pass

        except ValidationError as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(status=HTTP_400_BAD_REQUEST)
        
        user_model.save()

        refresh = RefreshToken.for_user(user_model) 
        access = AccessToken.for_user(user_model) 

        return Response(data={'refresh': str(refresh), 'access': str(access), }, status=HTTP_200_OK)

