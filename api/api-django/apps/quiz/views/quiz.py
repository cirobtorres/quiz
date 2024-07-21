import os
from django.http import HttpRequest
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK, 
    HTTP_201_CREATED, 
    HTTP_400_BAD_REQUEST, 
    HTTP_401_UNAUTHORIZED, 
    HTTP_403_FORBIDDEN,
    HTTP_404_NOT_FOUND 
)
from ...user.views.tools import UserUtilities
from ..serializers import QuizSerializer
from ..models import QuizModel
from .tools import QuizTools


class QuizUserView(APIView, QuizTools, UserUtilities):
    parser_classes = (MultiPartParser, FormParser, JSONParser) 
    pagination_class = PageNumberPagination
    http_method_names = ['get', 'post', 'put', 'delete', ]

    def get(self, request: HttpRequest, pk: str = None, **kwargs) -> Response:
        """
        Possible URLs mountage:
            - http://127.0.0.1:8000/api/quiz -> all quizzes
            - http://127.0.0.1:8000/api/quiz/id -> 1 quiz of id=id
            - http://127.0.0.1:8000/api/quiz/user-quiz -> all quizzes for that user (protected)
            - http://127.0.0.1:8000/api/quiz/user-quiz/id -> 1 quiz of id=id for that user (protected)
        """
        try:
            user_model = self.get_user()
        except AttributeError as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(data={'message': 'Invalid token'}, status=HTTP_401_UNAUTHORIZED)
        
        except ObjectDoesNotExist as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(data={'message': 'User not found'}, status=HTTP_404_NOT_FOUND)
        
        if pk:
            try:
                quiz_model = QuizModel.objects.get(pk=pk, user=user_model.settings)
            except ObjectDoesNotExist as e:
                # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
                return Response(data={'message': 'Quiz not found'}, status=HTTP_404_NOT_FOUND)
            if quiz_model.blocked:
                # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
                return Response(data={'message': 'Blocked Quiz'}, status=HTTP_400_BAD_REQUEST)
            quiz_serializer = QuizSerializer(instance=quiz_model)
            return Response(data=quiz_serializer.data, status=HTTP_200_OK)
        
        quiz_queryset = self.get_queryset(user_id=user_model.pk, order_by=('-id', 'subject')) 
        
        page = request.query_params.get('page', 1)
        page_size = request.query_params.get('page_size', 10)

        paginator = self.pagination_class()
        paginator.page_size = page_size

        results = paginator.paginate_queryset(quiz_queryset, request)

        serializer = QuizSerializer(results, many=True)

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
            status=HTTP_200_OK)
        

    def post(self, request: HttpRequest) -> Response:
        try:
            user_model = self.get_user()
        except AttributeError as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(data={'message': 'Invalid token'}, status=HTTP_401_UNAUTHORIZED)
        
        except ObjectDoesNotExist as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(data={'message': 'User not found'}, status=HTTP_404_NOT_FOUND)
        
        quiz = QuizModel(**request.data)
        quiz.save()

        user_model.settings.quiz.add(quiz)
        user_model.save()

        return Response(data={'message': 'Quiz created'}, status=HTTP_201_CREATED)

    def put(self, request: HttpRequest, pk: str = None) -> Response:
        try:
            user_model = self.get_user()
        except AttributeError as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(data={'message': 'Invalid token'}, status=HTTP_401_UNAUTHORIZED)
        
        try:
            quiz_model = QuizModel.objects.get(pk=pk)
        except ObjectDoesNotExist as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(data={'message': 'Quiz not found'}, status=HTTP_404_NOT_FOUND)
        
        if not (quiz_model in user_model.settings.quiz.all()):
            return Response(data={'message': "You cannot edit another user's quiz"}, status=HTTP_403_FORBIDDEN)

        for field, value in request.data.items():
            setattr(quiz_model, field, value)
        
        quiz_model.save()
        quiz_serializer = QuizSerializer(instance=quiz_model)

        return Response(data=quiz_serializer.data, status=HTTP_200_OK)

    def delete(self, request: HttpRequest, pk: str = None) -> Response:
        try:
            user_model = self.get_user()
        except AttributeError as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(data={'message': 'Invalid token'}, status=HTTP_401_UNAUTHORIZED)
        
        try:
            quiz_model = QuizModel.objects.get(pk=pk)
        except ObjectDoesNotExist as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(data={'message': 'Quiz not found'}, status=HTTP_404_NOT_FOUND)
        
        if not (quiz_model in user_model.settings.quiz.all()):
            return Response(data={'message': "You cannot delete another user's quiz"}, status=HTTP_403_FORBIDDEN)

        quiz_model.delete()
        
        return Response(data={'message': 'Quiz deleted'}, status=HTTP_200_OK)


class QuizListView(APIView, QuizTools, UserUtilities):
    pagination_class = PageNumberPagination
    http_method_names = ['get', ]

    def get(self, request: HttpRequest, pk: str = None, **kwargs) -> Response:
        if pk:
            try:
                quiz_model = QuizModel.objects.get(pk=pk)
            except ObjectDoesNotExist as e:
                # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
                return Response(data={'message': 'Quiz not found'}, status=HTTP_404_NOT_FOUND)
            if quiz_model.blocked:
                return Response(data={'message': 'Blocked Quiz'}, status=HTTP_400_BAD_REQUEST)
            quiz_serializer = QuizSerializer(instance=quiz_model)
            return Response(data=quiz_serializer.data, status=HTTP_200_OK)
        
        quiz_queryset = self.get_queryset(order_by=('-id', 'subject'))    
        
        page = request.query_params.get('page', 1)
        page_size = request.query_params.get('page_size', 10)

        paginator = self.pagination_class()
        paginator.page_size = page_size

        results = paginator.paginate_queryset(quiz_queryset, request)

        serializer = QuizSerializer(results, many=True)

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
            status=HTTP_200_OK)