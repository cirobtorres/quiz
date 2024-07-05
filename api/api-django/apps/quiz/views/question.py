from django.http import HttpRequest
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK, 
    HTTP_201_CREATED, 
    HTTP_404_NOT_FOUND
)
from .tools import QuestionTools


class QuestionView(APIView, QuestionTools):
    lookup_field = 'pk'
    http_method_names = ['get', 'post', 'put', 'delete', ]

    def get(self, request: HttpRequest, pk: str = None) -> Response:
        """
        Returns a single question, if passed a primary key as an argument, or a list of questions if no primary key is given.

        Possible URLs:
            - http://127.0.0.1:8000/api/quiz -> all quizes
            - http://127.0.0.1:8000/api/quiz/question -> 10 random questions from all quizes
            - http://127.0.0.1:8000/api/quiz/question?size=5 -> 5 random questions from all quizes
            - http://127.0.0.1:8000/api/quiz/question?quiz=1 -> 10 random questions from quiz=1
            - http://127.0.0.1:8000/api/quiz/question?quiz=1&quiz=2 -> 10 random questions from quiz=[1, 2]
            - http://127.0.0.1:8000/api/quiz/question?quiz=1&quiz=2&size=5 -> 5 random questions from quiz=[1, 2]
            - http://127.0.0.1:8000/api/quiz/question/1 -> question pk=1
        """
        if pk:
            try:
                question_model = self.get_object(pk=pk)
            except ObjectDoesNotExist as e:
                # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
                return Response(data={'message': 'Question not found'}, status=HTTP_404_NOT_FOUND)
            question_serializer = self.question_serializer(instance=question_model)
            return Response(data=question_serializer.data, status=HTTP_200_OK)
        
        params = {}
        
        if request.GET:
            quiz_params = request.GET.getlist('quiz')
            size_params = request.GET.get('size')

            if quiz_params:
                params.update({'quiz': [int(s) for s in quiz_params],})
            
            if size_params:
                params.update({'size': int(size_params),})

        question_model = self.get_queryset(**params)

        question_serializer = self.question_serializer(instance=question_model, many=True)

        return Response(data=question_serializer.data, status=HTTP_200_OK)
    
    def post(self, request: HttpRequest, **kwargs) -> Response:
        """Creates a new question"""
        quiz_id = request.data.get('quiz_id')
        text = request.data.get('question_text')

        question_model = self.question_model.objects.create(quiz_id=quiz_id, text=text)
        question_model.save()

        question_serializer = self.question_serializer(instance=question_model)

        return Response(data=question_serializer.data, status=HTTP_201_CREATED)

    def put(self, request: HttpRequest, pk: str = None) -> Response:
        """Updates an existing question"""
        try:
            question_model = self.get_object(pk=pk)
        except ObjectDoesNotExist as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(data={'message': 'Question not found'}, status=HTTP_404_NOT_FOUND)
        
        question_model.text = request.data.get('question_text')

        question_model.save()

        question_serializer = self.question_serializer(instance=question_model)
        return Response(data=question_serializer.data, status=HTTP_200_OK)
    
    def delete(self, request: HttpRequest, pk: str = None) -> Response:
        """Delete an existing question"""
        try:
            question_model = self.get_object(pk=pk)
        except ObjectDoesNotExist as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(data={'message': 'Question not found'}, status=HTTP_404_NOT_FOUND)
        
        question_model.delete()
        
        return Response(data={'message': 'Question deleted'}, status=HTTP_200_OK)


