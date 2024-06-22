import json
from django.http import HttpRequest
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK, 
    HTTP_201_CREATED, 
    HTTP_400_BAD_REQUEST, 
    HTTP_401_UNAUTHORIZED, 
    HTTP_404_NOT_FOUND, 
)
from rest_framework.parsers import MultiPartParser
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from .tools import UserUtilities, UserPermissions
from ..serializers import UserScoreSerializer


class UserUpdateView(APIView, UserUtilities):
    authentication_classes = [JWTAuthentication]
    permission_classes = [UserPermissions]
    parser_classes = (MultiPartParser,)
    http_method_names = ['put',]

    def put(self, request: HttpRequest) -> Response:
        user_model = self.get_user()

        try:
            # for field in request.body:
            #     if request.body[field] == "":
            #         del request.body[field]
            
            body_str = request.data.get('json')
            body_json = json.loads(body_str)
            for field in body_json:
                if body_json[field] == '':
                    del body_json[field]

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
        
        user_serializer = self.user_serializer(instance=user_model, data=body_json, partial=True)
        
        if user_serializer.is_valid():
            user_serializer.save()
            user = user_serializer.instance
            refresh = RefreshToken.for_user(user)
            access = AccessToken.for_user(user)

            return Response(data={'refresh': str(refresh), 'access': str(access), }, status=HTTP_200_OK)
    
        return Response(data={'message': user_serializer.errors, }, status=HTTP_400_BAD_REQUEST)


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


class UserDeleteView(APIView, UserUtilities):
    authentication_classes = [JWTAuthentication]
    permission_classes = [UserPermissions]
    http_method_names = ['delete',]

    def delete(self, request: HttpRequest) -> Response:
        user_model = self.get_user()

        try:
            not_valid = user_model.get('invalid')
            if not_valid:
                return Response(**not_valid)
        
        except AttributeError as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            pass

        user_model.delete()
        
        return Response(data={'message': 'User deleted', }, status=HTTP_200_OK)


class CompleteQuizView(APIView, UserPermissions, UserUtilities):
    authentication_classes = [JWTAuthentication]
    permission_classes = [UserPermissions]
    score_serializer = UserScoreSerializer
    http_method_names = ['post',]

    def post(self, request: HttpRequest) -> Response:
        user_model = self.get_user()

        try:
            not_valid = user_model.get('invalid')
            if not_valid:
                return Response(**not_valid)
        
        except AttributeError as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            pass

        score_quiz = request.data.get('quiz')
        score_serializers = list()

        for quiz in score_quiz:
            score_serializers.append(
                self.score_serializer(
                    data={
                        'quiz': quiz.get('quizId'),
                        'user': user_model.pk,
                        'total': quiz.get('totalQuestions'),
                        'corrects': quiz.get('correctAnswers'),
                    }
                )
            )

        if all([score_serializer.is_valid() for score_serializer in score_serializers]):
            for score_serializer in score_serializers:
                score_serializer.save()

            score_percentage = sum(
                [
                    score_serializer.data.get('corrects') /
                    score_serializer.data.get('total') * 100
                    for score_serializer in score_serializers
                ]
            ) / len(score_serializers)

            total = sum(
                [
                    score_serializer.data.get('total')
                    for score_serializer in score_serializers
                ]
            )

            corrects = sum(
                [
                    score_serializer.data.get('corrects')
                    for score_serializer in score_serializers
                ]
            )

            return Response(
                data={
                    'score': {
                        'scorePercentage': round(score_percentage),
                        'totalQuestions': total,
                        'correctAnswers': corrects,
                    },
                },
                status=HTTP_201_CREATED
            )
        
        return Response(data={'message': 'Error (not saved)'}, status=HTTP_400_BAD_REQUEST)

