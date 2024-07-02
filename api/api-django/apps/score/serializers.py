from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import PartialScoreModel, TotalScoreModel


class PartialScoreSerializer(ModelSerializer):
    class Meta:
        model = PartialScoreModel
        fields = 'id', 'quiz', 'total', 'corrects', 'get_score', 'created_at', 

    get_score = SerializerMethodField() 

    def get_score(self, instance): 
        return instance.get_score() 


class TotalScoreSerializer(ModelSerializer): 
    class Meta: 
        model = TotalScoreModel 
        fields = 'id', 'scores', 'user', 'get_score', 'get_total', 'get_corrects', 
        read_only_fields = 'get_score', 

    scores = PartialScoreSerializer(many=True)
    get_score = SerializerMethodField() 
    get_total = SerializerMethodField() 
    get_corrects = SerializerMethodField() 

    def get_score(self, instance):
        score = instance.get_score()
        return score if score is not None else 0

    def get_total(self, instance):
        total = instance.get_total()
        return total if total is not None else 0

    def get_corrects(self, instance):
        corrects = instance.get_corrects()
        return corrects if corrects is not None else 0

    def save(self, **kwargs):
        obj = super().save(**kwargs)
        
        return obj

