from django.http import HttpRequest
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED 
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.exceptions import AuthenticationFailed
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


class UserLoginView(UserUtilities, TokenObtainPairView):
    def post(self, request: HttpRequest, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            return response
        except AuthenticationFailed as e:
            # print('-x' * 35 + '-\n', e, '\n', '*' * 70, '\n', sep='') 
            return Response({'message': 'Invalid username or password', }, status=HTTP_401_UNAUTHORIZED)


