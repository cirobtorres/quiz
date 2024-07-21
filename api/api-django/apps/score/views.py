from django.http import HttpRequest
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
    HTTP_404_NOT_FOUND
)
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.pagination import PageNumberPagination
from ..quiz.models import QuizModel
from ..user.views import UserUtilities, UserPermissions
from .serializers import UserScoreProfileSerializer
from .models import PartialScoreModel, UserScoreProfileModel, TotalScoreModel


class ScoreView(APIView, UserUtilities):
    authentication_classes = [JWTAuthentication]
    permission_classes = [UserPermissions]
    pagination_class = PageNumberPagination
    http_method_names = ['get', 'post', ]

    def get(self, request: HttpRequest) -> Response:
        try:
            user_model = self.get_user()
        except AttributeError as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(data={'message': 'Invalid token'}, status=HTTP_401_UNAUTHORIZED)
        
        except ObjectDoesNotExist as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(data={'message': 'User not found'}, status=HTTP_404_NOT_FOUND)
        
        score_queryset = UserScoreProfileModel.objects.get(user__id=user_model.id)
        score_serializer = UserScoreProfileSerializer(instance=score_queryset)
        return Response(data=score_serializer.data, status=HTTP_200_OK)

    def post(self, request: HttpRequest) -> Response:
        try:
            user_model = self.get_user()
        except AttributeError as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(data={'message': 'Invalid token'}, status=HTTP_401_UNAUTHORIZED)
        
        except ObjectDoesNotExist as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(data={'message': 'User not found'}, status=HTTP_404_NOT_FOUND)
        
        us = UserScoreProfileModel.objects.get(user=user_model)

        ts = TotalScoreModel()
        ts.save()

        score_quiz = request.data.get('score')

        for quiz in score_quiz:
            quiz_pk = quiz.get('quiz_id')
            quiz_model = QuizModel.objects.get(pk=quiz_pk)

            ps = PartialScoreModel(
                quiz=quiz_model,
                total=quiz.get('total_questions'),
                corrects=quiz.get('correct_answers'),
            )

            ps.save()
            ts.partial_scores.add(ps)
        
        us.scores.add(ts)
        us.save()

        us_serialized = UserScoreProfileSerializer(instance=us)

        return Response(data={'message': us_serialized.data},status=HTTP_201_CREATED)

