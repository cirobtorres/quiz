from django.http import HttpRequest
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED, HTTP_404_NOT_FOUND
from rest_framework.parsers import MultiPartParser
from rest_framework.pagination import PageNumberPagination
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.exceptions import AuthenticationFailed, TokenError
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from .tools import UserUtilities, UserPermissions
from ..serializers import UserListSerializer, UserSerializer


class UserLoginView(TokenObtainPairView):
    http_method_names = ['post',]

    def post(self, request: HttpRequest, *args, **kwargs):
        try: # TokenObtainPairView: if user does not exists -> 401 Unauthorized
            email, password = request.data.values()
            user = authenticate(email=email, password=password) # -> user | None

            if user is not None:
                login(request, user)
                # From now on, request.user.is_authenticated = True 

                response = super().post(request, *args, **kwargs) 
                # Django authentication is now passed on to simple-JWT tokens through request
                # Now, request.user is no longer considered annonymous, and last_login is automatically updated

                return response
            
            return Response(data={'message': 'Invalid username or password'}, status=HTTP_400_BAD_REQUEST)
        
        except AuthenticationFailed as e:
            # print('-x' * 35 + '-\n', e, '\n', '*' * 70, '\n', sep='') 
            return Response(data={'message': 'Invalid token', }, status=HTTP_401_UNAUTHORIZED)


class UserLogoutView(APIView):
    permission_classes = [UserPermissions]
    http_method_names = ['post',]

    def post(self, request: HttpRequest):
        try:
            token = RefreshToken(request.data.get('refresh')) # Raise a TokenError 
            token.blacklist()
            logout(request) # Doesn't throw an error
            return Response(data={'message': 'User logged out'}, status=HTTP_200_OK)
        except TokenError as e:
            return Response(data={'message': 'Invalid or expired token'}, status=HTTP_401_UNAUTHORIZED)


class UserDataView(APIView, UserUtilities):
    authentication_classes = [JWTAuthentication]
    permission_classes = [UserPermissions]
    parser_classes = (MultiPartParser,)
    http_method_names = ['get',]

    def get(self, request: HttpRequest) -> Response:
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
            user_serializer = UserSerializer(instance=user_model)

        return Response(data=user_serializer.data, status=HTTP_200_OK)


class UserListView(APIView, UserUtilities):
    pagination_class = PageNumberPagination
    http_method_names = ['get']

    def get(self, request: HttpRequest, **kwargs) -> Response:    
        user_queryset = self.get_queryset(order_by=('-id', 'username'))
            
        page = request.query_params.get('page', 1)
        page_size = request.query_params.get('page_size', 10)

        paginator = self.pagination_class()
        paginator.page_size = page_size

        results = paginator.paginate_queryset(user_queryset, request)

        serializer = UserListSerializer(results, many=True)

        return Response(
            data={
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
            }, 
            status=HTTP_200_OK
        )


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

