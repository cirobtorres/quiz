from django.http import HttpRequest
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import QuerySet

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.reverse import reverse as api_reverse
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework import status

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
                return Response(data={'error': 'not found'}, status=status.HTTP_404_NOT_FOUND)
            serializer = self.serializer_class(instance=instance)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        queryset = self.get_queryset()
        serializer = self.serializer_class(instance=queryset, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class LoadScore(APIView):
    authentication_classes = [JWTAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
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
                return Response(data={'error': 'not found'}, status=status.HTTP_404_NOT_FOUND)
            serializer = self.serializer_class(instance=instance)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        queryset = self.get_queryset()
        serializer = self.serializer_class(instance=queryset, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request: HttpRequest, pk: str = None) -> Response:
        score_user = request.data.pop('quizUserId')
        score_quiz = request.data.get('quizIds')
        score_serializers = list()
        for quiz in score_quiz:
            score_serializers.append(
                self.serializer_class(
                    data={
                        'score_user': score_user,
                        'score_quiz': quiz.get('quizId'),
                        'total_questions': quiz.get('totalQuestions'),
                        'total_correct_answers': quiz.get('totalCorrectAnswers'),
                    }
                )
            )
        if all([score_serializer.is_valid() for score_serializer in score_serializers]):
            for score_serializer in score_serializers:
                score_serializer.save()
            score_percentage = sum(
                [
                    score_serializer.data.get('total_correct_answers') /
                    score_serializer.data.get('total_questions') * 100
                    for score_serializer in score_serializers
                ]
            ) / len(score_serializers)
            total_questions = sum(
                [
                    score_serializer.data.get('total_questions')
                    for score_serializer in score_serializers
                ]
            )
            total_correct_answers = sum(
                [
                    score_serializer.data.get('total_correct_answers')
                    for score_serializer in score_serializers
                ]
            )
            return Response(
                data={
                    'score': {
                        'scorePercentage': round(score_percentage),
                        'totalQuestions': total_questions,
                        'totalCorrectAnswers': total_correct_answers,
                    },
                },
                status=status.HTTP_201_CREATED
            )
        return Response(data={'error': 'not saved'}, status=status.HTTP_400_BAD_REQUEST)


class ListQuizes(APIView):
    """List all quizes for Select Component in frontend."""
    serializer_class = QuizSerializer
    model = QuizModel

    def get_queryset(self, **kwargs):
        return self.model.objects.all()

    def get(self, request: HttpRequest, *args, **kwargs) -> Response:
        instances = self.get_queryset(**kwargs)
        serializers = self.serializer_class(instance=instances, many=True)
        return Response(data=serializers.data, status=status.HTTP_200_OK)


class LoadPreferences(APIView):
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
            return Response(data={'error': 'not found'}, status=status.HTTP_404_NOT_FOUND)
        questions = self.get_queryset(instance)
        questions_serializers = QuestionSerializer(
            instance=questions,
            many=True,
        )
        instance_serializers = self.serializer_class(instance=instance)
        quiz_serializers = QuizSerializer(
            instance=instance.preferences_quiz.all(),
            many=True,
        )
        return Response(
            data={
                'instance': instance_serializers.data,
                'quizList': quiz_serializers.data,
                'questionsList': questions_serializers.data,
            },
            status=status.HTTP_200_OK
        )

    def put(self, request: HttpRequest, pk: str, *args, **kwargs) -> Response:
        preferences_data = {
            'preferences_user': int(request.data.get('id')),
            'question_number': int(request.data.get('question_number')),
            'time_to_answer': int(request.data.get('time_to_answer')),
            'preferences_quiz': request.user.preferences_user.preferences_quiz.all().values_list('id', flat=True),
        }
        if request.data.get('preferences_quiz'):
            preferences_data.update(
                {
                    'preferences_quiz': [
                        int(quiz) for quiz in request.data.get('preferences_quiz')[1:-1].split(',')
                    ],
                }
            )
        try:
            instance = self.get_object(pk=pk, **kwargs)
        except ObjectDoesNotExist:
            return Response(data={'error': 'not found'}, status=status.HTTP_404_NOT_FOUND)
        instance_serializers = self.serializer_class(
            instance=instance,
            data=preferences_data
        )
        if instance_serializers.is_valid():
            instance_serializers.save()
            return Response(
                data=instance_serializers.data.get('id'),
                status=status.HTTP_200_OK
            )
        return Response(data={'error': 'not saved'}, status=status.HTTP_400_BAD_REQUEST)
