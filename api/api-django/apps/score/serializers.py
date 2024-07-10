from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import PartialScoreModel, TotalScoreModel


class PartialScoreSerializer(ModelSerializer):
    class Meta:
        model = PartialScoreModel
        fields = (
            'id', 
            'quiz', 
            'total', 
            'corrects', 
            'created_at', 
        )


class TotalScoreSerializer(ModelSerializer): 
    class Meta: 
        model = TotalScoreModel 
        fields = (
            'id', 
            'scores', 
            'user', 
            'get_score_percentage', 
            'get_total_questions', 
            'get_correct_answers', 
        )
        read_only_fields = (
            'id', 
            'scores', 
            'user', 
            'get_score_percentage', 
            'get_total_questions', 
            'get_correct_answers', 
        )

    scores = PartialScoreSerializer(many=True)
    get_score_percentage = SerializerMethodField() 
    get_total_questions = SerializerMethodField() 
    get_correct_answers = SerializerMethodField() 

    def get_score_percentage(self, instance):
        score = instance.get_score_percentage()
        return score if score is not None else 0

    def get_total_questions(self, instance):
        total = instance.get_total_questions()
        return total if total is not None else 0

    def get_correct_answers(self, instance):
        corrects = instance.get_correct_answers()
        return corrects if corrects is not None else 0

    def save(self, **kwargs):
        obj = super().save(**kwargs)
        
        return obj

