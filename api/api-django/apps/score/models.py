from django.contrib.auth import get_user_model
from django.db import models
from ..quiz.models import QuizModel


class PartialScoreModel(models.Model): 
    quiz = models.ForeignKey(to=QuizModel, related_name='partial_score', on_delete=models.CASCADE, null=True) 
    total = models.PositiveIntegerField(default=0) # Total questions 
    corrects = models.PositiveIntegerField(default=0) # Total correct questions 
    created_at = models.DateTimeField(auto_now_add=True) 

    def get_score(self) -> float | None: 
        return (self.corrects / self.total * 100) if self.total > 0 else None 


class TotalScoreModel(models.Model): 
    scores = models.ManyToManyField(to=PartialScoreModel, related_name='total_score') 
    user = models.ForeignKey(to=get_user_model(), related_name='total_score', on_delete=models.CASCADE, null=True) 

    def __str__(self) -> str: 
        return f'TotalScoreModel id= {self.id}, Score: {self.get_score()} Quizes: {self.scores}' 
    
    def get_score(self) -> float | None:
        scores = self.scores.all()
        if scores:
            return sum(score.get_score() for score in scores) / self.scores.count()
        return None
    
    def get_total(self) -> float | None:
        scores = self.scores.all()
        return sum(score.total for score in scores) if scores.count() > 0 else None
    
    def get_corrects(self) -> float | None:
        scores = self.scores.all()
        return sum(score.corrects for score in scores) if scores.count() > 0 else None

