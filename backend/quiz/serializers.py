from rest_framework import serializers

from quiz.models import (
    QuestionModel,
    AnswerModel,
    QuizModel,
    ScoreModel
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
            # 'get_questions',
        ]

    # get_questions = serializers.SerializerMethodField()

    # def get_questions(self, instance):
    #     return instance.get_questions()


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerModel
        fields = [
            'id', 'answer_text', 'is_correct',
        ]


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionModel
        fields = [
            'id',
            # 'quiz',
            'question_text',
            # 'answer',
            'get_shuffled_answers',
            # 'get_correct_answer',
        ]

    # quiz = QuizSerializer(read_only=True)
    # answer = AnswerSerializer(many=True, read_only=True)
    get_shuffled_answers = serializers.SerializerMethodField()
    # get_correct_answer = serializers.SerializerMethodField()

    def get_shuffled_answers(self, instance):
        return instance.get_shuffled_answers()

    # def get_correct_answer(self, instance):
    #     return instance.get_correct_answer()


class ScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScoreModel
        fields = [
            'id',
            'quiz',
            'quiz_user',
            'total_correct_answers',
            'total_questions',
            'get_score_percentage',
            'created_at',
        ]

    # quiz = QuizSerializer(read_only=True)
    # quiz_user = QuizUserSerializer(many=True, read_only=True)
