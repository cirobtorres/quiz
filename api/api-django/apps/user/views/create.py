from django.http import HttpRequest
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.validators import ValidationError
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST 
from rest_framework_simplejwt.authentication import JWTAuthentication
from .tools import UserUtilities
from ..models import UserSettingsModel, UserModel
from ..validators import UserValidator
from ...score.models import UserScoreProfileModel
from ...media_app.models import UserImageModel


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
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            raise ValidationError(e.detail, code=e.status_code)
        
        instance = UserModel(username=username, email=email, password=password)
        instance.set_password(instance.password)
        instance.save()

        settings = UserSettingsModel(user=instance)
        settings.save()

        scores = UserScoreProfileModel(user=instance)
        scores.save()

        return Response(data={'message': 'User created', }, status=HTTP_201_CREATED)

