from django.http import HttpRequest
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import QuerySet
from django.forms.models import model_to_dict

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK, HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND,
)

from .models import QuizModel, QuestionModel, ScoreModel
from .serializers import QuizSerializer, QuestionSerializer, ScoreSerializer
from .questions.populate_db import populate_database


class Questions(APIView):
    model = QuestionModel
    serializer_class = QuestionSerializer
    lookup_field = 'pk'

    def get_object(self, pk) -> QuestionModel:
        return self.model.objects.get(pk=pk)

    def get_queryset(self) -> QuerySet[QuestionModel]:
        if not self.model.objects.exists():
            populate_database()
        return self.model.objects.order_by('?')[:10]

    def get(self, request: HttpRequest, pk: int = None) -> Response:
        if pk:
            try:
                instance = self.get_object(pk=pk)
            except ObjectDoesNotExist:
                return Response(data={'error': 'not found'}, status=HTTP_404_NOT_FOUND)
            serializer = self.serializer_class(instance=instance)
            return Response(data=serializer.data, status=HTTP_200_OK)
        queryset = self.get_queryset()
        serializer = self.serializer_class(instance=queryset, many=True)
        return Response(data=serializer.data, status=HTTP_200_OK)


class Score(APIView):
    model = ScoreModel
    serializer_class = ScoreSerializer
    lookup_field = 'pk'

    def get_object(self, pk) -> ScoreModel:
        return self.model.objects.get(pk=pk)

    def get_queryset(self) -> QuerySet[ScoreModel]:
        return self.model.objects.all()

    def get(self, request: HttpRequest, pk: int = None) -> Response:
        if pk:
            try:
                instance = self.get_object(pk=pk)
            except ObjectDoesNotExist:
                return Response(data={'error': 'not found'}, status=HTTP_404_NOT_FOUND)
            serializer = self.serializer_class(instance=instance)
            return Response(data=serializer.data, status=HTTP_200_OK)
        queryset = self.get_queryset()
        serializer = self.serializer_class(instance=queryset, many=True)
        return Response(data=serializer.data, status=HTTP_200_OK)

    def post(self, request: HttpRequest, pk: int = None) -> Response:
        score_serializer = self.serializer_class(data=request.data)
        if score_serializer.is_valid():
            score_serializer.save()
            return Response(data=score_serializer.data, status=HTTP_201_CREATED)
        return Response(data={'error': 'not saved'}, status=HTTP_400_BAD_REQUEST)


class Quizes(APIView):
    serializer_class = QuizSerializer
    model = QuizModel

    def get_queryset(self, **kwargs):
        return self.model.objects.all()

    def get(self, request: HttpRequest, *args, **kwargs) -> Response:
        instances = self.get_queryset(**kwargs)
        serializers = self.serializer_class(instance=instances, many=True)
        return Response(data=serializers.data, status=HTTP_200_OK)
