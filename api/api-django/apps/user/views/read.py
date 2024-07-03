from django.http import HttpRequest
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED
from rest_framework.parsers import MultiPartParser
from rest_framework.pagination import PageNumberPagination
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.exceptions import AuthenticationFailed
from rest_framework_simplejwt.authentication import JWTAuthentication
from .tools import UserUtilities, UserPermissions


class UserLoginView(UserUtilities, TokenObtainPairView):
    def post(self, request: HttpRequest, *args, **kwargs):
        try:
           # If user does not exists -> 401 Unauthorized
            response = super().post(request, *args, **kwargs)
            return response
        except AuthenticationFailed as e:
            # print('-x' * 35 + '-\n', e, '\n', '*' * 70, '\n', sep='') 
            return Response({'message': 'Invalid username or password', }, status=HTTP_401_UNAUTHORIZED)


class UserDataView(APIView, UserUtilities):
    authentication_classes = [JWTAuthentication]
    permission_classes = [UserPermissions]
    parser_classes = (MultiPartParser,)
    http_method_names = ['get',]

    def get(self, request: HttpRequest) -> Response:
        user_model = self.get_user()

        try:
            not_valid = user_model.get('invalid')
            if not_valid:
                return Response(**not_valid)
        
        except AttributeError as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            user_serializer = self.user_serializer(instance=user_model)

        return Response(data=user_serializer.data, status=HTTP_200_OK)


class UserListView(APIView, UserUtilities):
    pagination_class = PageNumberPagination
    http_method_names = ['get']

    def get(self, request: HttpRequest, **kwargs) -> Response:
        user_queryset = self.get_queryset(order_by=('-id', 'username'))
        data = self.paginate(request, user_queryset, **kwargs)
        return Response(**data)


class UserCredentialsVerify(APIView, UserUtilities):
    http_method_names = ['post']

    def post(self, request: HttpRequest) -> Response:
        username = request.data.get('username')
        email = request.data.get('email')

        if username:
            if self.exists(username=username):
                return Response(data={'message': 'Username already in use'}, status=HTTP_400_BAD_REQUEST)
            return Response(data={'message': None}, status=HTTP_200_OK)

        if email:
            if self.exists(email=email):
                return Response(data={'message': 'E-mail already in use'}, status=HTTP_400_BAD_REQUEST)
            return Response(data={'message': None}, status=HTTP_200_OK)

