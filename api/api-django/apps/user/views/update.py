import json
from django.http import HttpRequest
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.parsers import MultiPartParser
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from .tools import UserUtilities, UserPermissions


class UserUpdateView(APIView, UserUtilities):
    authentication_classes = [JWTAuthentication]
    permission_classes = [UserPermissions]
    parser_classes = (MultiPartParser,)
    http_method_names = ['put',]

    def put(self, request: HttpRequest) -> Response:
        user_model = self.get_user()

        body = request.data.dict().copy()

        try:
            for field in request.data:
                if body[field] == "":
                    del body[field]
            
            # body_str = request.data.get('json')
            # body = json.loads(body_str)
            # for field in body:
            #     if body[field] == '':
            #         del body[field]

        except Exception as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(data={'message': 'Invalid fetched data', }, status=HTTP_400_BAD_REQUEST)

        try:
            not_valid = user_model.get('invalid')
            if not_valid:
                return Response(**not_valid)
        
        except AttributeError as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            user_serializer = self.user_serializer(instance=user_model)
        
        user_serializer = self.user_serializer(instance=user_model, data=body, partial=True)
        
        if user_serializer.is_valid():
            user_serializer.save()
            user = user_serializer.instance
            refresh = RefreshToken.for_user(user)
            access = AccessToken.for_user(user)

            return Response(data={'refresh': str(refresh), 'access': str(access), }, status=HTTP_200_OK)
    
        return Response(data={'message': user_serializer.errors, }, status=HTTP_400_BAD_REQUEST)

