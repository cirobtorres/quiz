from django.contrib.auth import get_user_model
from django.db import models
from ..quiz.models import QuizModel


class PartialScoreModel(models.Model): 
    quiz = models.ForeignKey(to=QuizModel, related_name='partial_score', on_delete=models.CASCADE, null=True) 
    total = models.PositiveIntegerField(default=0) # Total questions 
    corrects = models.PositiveIntegerField(default=0) # Total correct questions 
    created_at = models.DateTimeField(auto_now_add=True) 


class TotalScoreModel(models.Model): 
    scores = models.ManyToManyField(to=PartialScoreModel, related_name='total_score') 
    user = models.ForeignKey(to=get_user_model(), related_name='scores', on_delete=models.CASCADE, null=True) 

    def __str__(self) -> str: 
        return f'TotalScoreModel id= {self.id}, Score: {self.get_score()} Quizzes: {self.scores}' 
    
    def get_score_percentage(self) -> float:
        if self.get_total_questions() > 0:
            return 100 * self.get_correct_answers() / self.get_total_questions()
        return 0
    
    def get_total_questions(self) -> float:
        scores = self.scores.all()
        if scores:
            return sum(score.total for score in scores) if scores.count() > 0 else None
        return 0
    
    def get_correct_answers(self) -> float:
        scores = self.scores.all()
        if scores:
            return sum(score.corrects for score in scores) if scores.count() > 0 else None
        return 0

