from django.http import HttpRequest
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST 
from rest_framework_simplejwt.authentication import JWTAuthentication
from .tools import UserUtilities
from rest_framework.validators import ValidationError
from ..models import UserSettingsModel
from ..validators import UserValidator


class UserRegisterView(APIView, UserUtilities):
    authentication_classes = [JWTAuthentication]
    permission_classes = []
    http_method_names = ['post']

    def post(self, request: HttpRequest) -> Response:
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        if not all([username, email, password]):
            return Response(data={'message': 'Missing fields', }, status=HTTP_400_BAD_REQUEST)
        
        try:
            UserValidator(self.request.data)
        except ValidationError as e:
            raise ValidationError(e.detail, code=e.status_code)
        
        settings = UserSettingsModel.objects.create()        
        instance = self.user_model(username=username, email=email, password=password, settings=settings)
        instance.save(commit=False)
        instance.set_password(instance.password)
        instance.save()

        return Response(data={'message': 'User created', }, status=HTTP_201_CREATED)

