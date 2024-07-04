from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import QuizModel, QuestionModel, AnswerModel


class QuizSerializer(ModelSerializer):
    class Meta:
        model = QuizModel
        fields = 'id', 'subject', 'slug', 'private', 'created_at', 


class QuestionSerializer(ModelSerializer):
    class Meta:
        model = QuestionModel
        fields = 'id', 'quiz_id', 'text', 'get_shuffled_answers', 

    get_shuffled_answers = SerializerMethodField()

    def get_shuffled_answers(self, instance):
        return instance.get_shuffled_answers()


class AnswerSerializer(ModelSerializer):
    class Meta:
        model = AnswerModel
        fields = 'id', 'question_id', 'text', 'is_correct', 

