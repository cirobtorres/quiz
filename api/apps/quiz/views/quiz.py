from django.http import HttpRequest
from django.db.utils import IntegrityError
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK, 
    HTTP_201_CREATED, 
    HTTP_400_BAD_REQUEST, 
    HTTP_404_NOT_FOUND 
)
from ..serializers import QuizSerializer
from ..models import QuizModel


class QuizView(APIView):
    quiz_serializer = QuizSerializer
    quiz_model = QuizModel
    http_method_names = ['get', 'post', 'put', 'delete', ]

    def get(self, request: HttpRequest, pk: str = None) -> Response:
        if pk:
            try:
                quiz_model = self.quiz_model.objects.get(pk=pk)
            except ObjectDoesNotExist as e:
                # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
                return Response(data={'message': 'Quiz not found'}, status=HTTP_404_NOT_FOUND)
            quiz_serializer = self.quiz_serializer(instance=quiz_model)
            return Response(data=quiz_serializer.data, status=HTTP_200_OK)

        quiz_model = self.quiz_model.objects.all()
        quiz_serializer = self.quiz_serializer(instance=quiz_model, many=True)

        return Response(data=quiz_serializer.data, status=HTTP_200_OK)

    def post(self, request: HttpRequest) -> Response:
        quiz_subject = request.data.get('subject')

        try :
            quiz = self.quiz_model(subject=quiz_subject)
            quiz.save()
        except IntegrityError as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(data={'message': 'Quiz already exists'}, status=HTTP_400_BAD_REQUEST)

        return Response(data={'message': 'Quiz created'}, status=HTTP_201_CREATED)

    def put(self, request: HttpRequest, pk: str = None) -> Response:
        try:
            quiz_model = self.quiz_model.objects.get(pk=pk)
        except ObjectDoesNotExist as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(data={'message': 'Quiz not found'}, status=HTTP_404_NOT_FOUND)

        quiz_subject = request.data.get('subject')
        quiz_model.subject = quiz_subject
        quiz_model.save()
        quiz_serializer = self.quiz_serializer(instance=quiz_model)

        return Response(data=quiz_serializer.data, status=HTTP_200_OK)

    def delete(self, request: HttpRequest, pk: str = None) -> Response:
        try:
            quiz_model = self.quiz_model.objects.get(pk=pk)
        except ObjectDoesNotExist as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(data={'message': 'Quiz not found'}, status=HTTP_404_NOT_FOUND)

        quiz_model.delete()
        
        return Response(data={'message': 'Quiz deleted'}, status=HTTP_200_OK)


