from rest_framework import serializers

from apps.quiz.models import (
    QuestionModel,
    AnswerModel,
    QuizModel,
    ScoreModel,
    PreferencesModel,
)


class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizModel
        fields = [
            'id',
            'subject',
            'slug',
            'description',
            'created_at',
        ]


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerModel
        fields = [
            'id',
            'answer_text',
            'is_correct',
        ]


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionModel
        fields = [
            'id',
            'question_quiz',
            'question_text',
            'get_shuffled_answers',
        ]

    get_shuffled_answers = serializers.SerializerMethodField()

    def get_shuffled_answers(self, instance):
        return instance.get_shuffled_answers()


class ScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScoreModel
        fields = [
            'id',
            'score_quiz',
            'score_user',
            'total_correct_answers',
            'total_questions',
            'get_score_percentage',
            'created_at',
        ]


class PreferencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PreferencesModel
        fields = '__all__'
