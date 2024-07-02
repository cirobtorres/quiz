from django.http import HttpRequest
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST 
from rest_framework_simplejwt.authentication import JWTAuthentication
from .tools import UserUtilities


class UserRegisterView(APIView, UserUtilities):
    authentication_classes = [JWTAuthentication]
    permission_classes = []
    http_method_names = ['post']

    def post(self, request) -> Response:
        email = request.data.get('email')
        password = request.data.get('password')

        if not all([email, password]):
            return Response(data={'message': 'Missing fields', }, status=HTTP_400_BAD_REQUEST)
        
        user_serializer = self.user_serializer(data=request.data)

        if user_serializer.is_valid():
            user_serializer.save()
            return Response(data={'message': 'User created', }, status=HTTP_201_CREATED)

        return Response(data={'message': user_serializer.errors}, status=HTTP_400_BAD_REQUEST)

