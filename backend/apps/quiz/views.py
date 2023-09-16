from django.http import HttpRequest
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import QuerySet

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import (
    HTTP_200_OK, HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND,
)

from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import (
    QuizModel,
    QuestionModel,
    ScoreModel,
    PreferencesModel,
)
from .serializers import (
    QuizSerializer,
    QuestionSerializer,
    ScoreSerializer,
    PreferencesSerializer,
)
from .questions.populate_db import populate_database


class LoadQuestions(APIView):
    """
    Load every question from database.
    """
    serializer_class = QuestionSerializer
    model = QuestionModel
    lookup_field = 'pk'

    def get_object(self, pk: str) -> QuestionModel:
        return self.model.objects.get(pk=pk)

    def get_queryset(self) -> QuerySet[QuestionModel]:
        if not self.model.objects.exists():
            populate_database()
        return self.model.objects.order_by('?')[:10]

    def get(self, request: HttpRequest, pk: str = None) -> Response:
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


class LoadScore(APIView):
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]
    serializer_class = ScoreSerializer
    model = ScoreModel
    lookup_field = 'pk'

    def get_object(self, pk: str) -> ScoreModel:
        return self.model.objects.get(pk=pk)

    def get_queryset(self) -> QuerySet[ScoreModel]:
        return self.model.objects.all()

    def get(self, request: HttpRequest, pk: str = None) -> Response:
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

    def post(self, request: HttpRequest, pk: str = None) -> Response:
        score_serializer = self.serializer_class(data=request.data)
        if score_serializer.is_valid():
            score_serializer.save()
            return Response(data=score_serializer.data, status=HTTP_201_CREATED)
        return Response(data={'error': 'not saved'}, status=HTTP_400_BAD_REQUEST)


class ListQuizes(APIView):
    """List all quizes for Select Component in frontend."""
    serializer_class = QuizSerializer
    model = QuizModel

    def get_queryset(self, **kwargs):
        return self.model.objects.all()

    def get(self, request: HttpRequest, *args, **kwargs) -> Response:
        instances = self.get_queryset(**kwargs)
        serializers = self.serializer_class(instance=instances, many=True)
        return Response(data=serializers.data, status=HTTP_200_OK)


class UpdatePreferences(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = PreferencesSerializer
    model = PreferencesModel

    def get_object(self, pk: str, **kwargs) -> PreferencesModel:
        return self.model.objects.get(pk=pk)

    def put(self, request: HttpRequest, pk: str, *args, **kwargs) -> Response:
        preferences_data = {
            'preferences_user': int(request.data.get('id')),
            'question_number': int(request.data.get('question_number')),
            'time_to_answer': int(request.data.get('time_to_answer')),
            'preferences_quiz': [
                int(i) for i in request.data.get('preferences_quiz')[1:-1].split(',')
            ],
        }
        print('-' * 100, preferences_data)
        try:
            instance = self.get_object(pk=pk, **kwargs)
        except ObjectDoesNotExist:
            return Response(data={'error': 'not found'}, status=HTTP_404_NOT_FOUND)
        serializer = self.serializer_class(
            instance=instance,
            data=preferences_data
        )
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=HTTP_200_OK)
        return Response(data={'error': 'not saved'}, status=HTTP_400_BAD_REQUEST)


class ListPreferences(APIView):
    """
    Load questions only from the subject user has allowed to (from his saved settings).
    """
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = PreferencesSerializer
    model = PreferencesModel

    def get_object(self, pk: str, **kwargs) -> PreferencesModel:
        return self.model.objects.get(pk=pk)

    def get_queryset(self, instance: PreferencesModel) -> QuerySet[QuestionModel]:
        preferences_quiz = self.model.objects.get(
            pk=instance.preferences_user_id).preferences_quiz.all()
        question_number = instance.question_number
        questions = QuestionModel.objects.filter(
            question_quiz_id__in=[quiz.id for quiz in preferences_quiz]
        ).order_by('?')[:question_number]
        return questions

    def get(self, request: HttpRequest, pk: str, *args, **kwargs) -> Response:
        try:
            instance = self.get_object(pk=pk, **kwargs)
        except ObjectDoesNotExist:
            return Response(data={'error': 'not found'}, status=HTTP_404_NOT_FOUND)
        questions = self.get_queryset(instance)
        questions_serializers = QuestionSerializer(
            instance=questions,
            many=True,
        )
        instance_serializers = self.serializer_class(instance=instance)
        return Response(
            data={
                'instance': instance_serializers.data,
                'questions': questions_serializers.data,
            },
            status=HTTP_200_OK
        )
