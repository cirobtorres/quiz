import json
from django.http import HttpRequest
from django.core.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser, FileUploadParser
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
        user_model = self.get_user() 

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
                        setattr(user_model, field, request.data[field])
                except AttributeError as e:
                    pass

        except ValidationError as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(status=HTTP_400_BAD_REQUEST)
        
        user_model.save(commit=False)
        user_model.set_password(user_model.password)
        user_model.save()

        refresh = RefreshToken.for_user(user_model) 
        access = AccessToken.for_user(user_model) 

        return Response(data={'refresh': str(refresh), 'access': str(access), }, status=HTTP_200_OK)

