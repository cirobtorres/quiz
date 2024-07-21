from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import PartialScoreModel, TotalScoreModel, UserScoreProfileModel


class PartialScoreSerializer(ModelSerializer):
    class Meta:
        model = PartialScoreModel
        fields = (
            'id', 
            'quiz', 
            'total', 
            'corrects', 
        )


class TotalScoreSerializer(ModelSerializer): 
    class Meta: 
        model = TotalScoreModel 
        fields = (
            'id', 
            'partial_scores', 
            'quiz_duration',  
            'get_quiz_name_tags', 
            'get_score_percentage', 
            'get_total_questions', 
            'get_correct_answers', 
            'created_at', 
        )
        read_only_fields = (
            'id', 
            'partial_scores', 
            'quiz_duration',  
            'get_quiz_name_tags', 
            'get_score_percentage', 
            'get_total_questions', 
            'get_correct_answers', 
            'created_at', 
        )


class UserScoreProfileSerializer(ModelSerializer): 
    class Meta: 
        model = UserScoreProfileModel 
        fields = (
            'id', 
            'scores', 
            'get_total_quizzes', 
            'get_total_questions', 
            'get_total_correct_answers', 
            'get_highest_quiz_score', 
            'get_lowest_quiz_score', 
            'get_max_accuracy_per_quiz', 
            'get_min_accuracy_per_quiz', 
        )
        read_only_fields = (
            'id', 
            'scores', 
            'get_total_quizzes', 
            'get_total_questions', 
            'get_total_correct_answers', 
            'get_highest_quiz_score', 
            'get_lowest_quiz_score', 
            'get_max_accuracy_per_quiz', 
            'get_min_accuracy_per_quiz', 
        )

    # scores = TotalScoreSerializer(many=True)

    def save(self, **kwargs):
        obj = super().save(**kwargs)
        
        return obj

