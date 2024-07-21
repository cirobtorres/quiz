from django.db import models
from django.contrib.auth import get_user_model
from ..quiz.models import QuizModel


class PartialScoreModel(models.Model): 
    quiz = models.ForeignKey(to=QuizModel, related_name='partial_score', on_delete=models.CASCADE, null=True) 
    total = models.PositiveIntegerField(default=0) # Total questions 
    corrects = models.PositiveIntegerField(default=0) # Total correct questions 

    def __str__(self) -> str: 
        return f'PartialScoreModel, id={self.id}' 


class TotalScoreModel(models.Model): 
    partial_scores = models.ManyToManyField(to=PartialScoreModel, related_name='total_score') 
    quiz_duration = models.IntegerField(default=0) 
    created_at = models.DateTimeField(auto_now_add=True) 

    def __str__(self) -> str: 
        return f'TotalScoreModel, id={self.id}' 
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

    def get_quiz_name_tags(self) -> list[str]: 
        quizzes = self.partial_scores.all()
        if quizzes.count() > 0: 
            return [quiz.quiz.subject for quiz in quizzes] 
        return [] 
    
    def get_score_percentage(self) -> float:
        if self.get_total_questions() > 0:
            return 100 * self.get_correct_answers() / self.get_total_questions()
        return 0
    
    def get_total_questions(self) -> float:
        partial_scores = self.partial_scores.all()
        if partial_scores:
            return sum(score.total for score in partial_scores) if partial_scores.count() > 0 else None
        return 0
    
    def get_correct_answers(self) -> float:
        partial_scores = self.partial_scores.all()
        if partial_scores:
            return sum(score.corrects for score in partial_scores) if partial_scores.count() > 0 else None
        return 0


class UserScoreProfileModel(models.Model): 
    user = models.OneToOneField(to=get_user_model(), related_name='scores', on_delete=models.CASCADE, null=True)
    scores = models.ManyToManyField(to=TotalScoreModel, related_name='scores') 
    
    def get_total_quizzes(self) -> float:
        scores = self.scores.all()
        return scores.count()
    
    def get_total_score(self) -> float:
        scores = self.scores.all()
        all_time_quiz_completed = scores.count()

        if all_time_quiz_completed > 0:
            sum_all_scores = sum(score.get_score_percentage() for score in scores)
            return round(sum_all_scores / all_time_quiz_completed, 1)
        else:
            return 0.0

    def get_total_questions(self) -> float:
        scores = self.scores.all()

        if scores.count() > 0:
            sum_all_questions = sum(score.get_total_questions() for score in scores)
            return sum_all_questions
        else:
            return 0.0

    def get_total_correct_answers(self) -> float:
        scores = self.scores.all()

        if scores.count() > 0:
            sum_all_correct_answers = sum(score.get_correct_answers() for score in scores)
            return sum_all_correct_answers
        else:
            return 0.0

    def get_highest_quiz_score(self) -> float:
        scores = self.scores.all()

        if scores.count() > 0:
            highest_quiz_score = max(score.get_score_percentage() for score in scores)
            return highest_quiz_score
        else:
            return 0.0

    def get_lowest_quiz_score(self) -> float:
        scores = self.scores.all()

        if scores.count() > 0:
            highest_quiz_score = min(score.get_score_percentage() for score in scores)
            return highest_quiz_score
        else:
            return 0.0
    
    def __user_performance_per_partial_quiz(self) -> list[dict] | None:
        """
        Return:
            {
                'quiz.id': [
                    score_percentage,           (float)
                    corrects,                   (float)
                    total_questions,            (float)
                ]
            },
                ...
        """
        scores = self.scores.all() # All total_scores for a specific user 
        if scores.count() > 0: 
            quizIds = {} 
            for score in scores: # Each total_scores individually 
                for partial_scores in score.partial_scores.all(): # Every partial_scores in total_scores 
                    if str(partial_scores.quiz.id) not in quizIds: 
                        quizIds.update({f'{partial_scores.quiz.id}': [0, 0]}) 
                    quizIds[f'{partial_scores.quiz.id}'][0] += partial_scores.corrects
                    quizIds[f'{partial_scores.quiz.id}'][1] += partial_scores.total 
                max_quiz = {key: [100 * values[0] / values[1], values[0], values[1]] for key, values in quizIds.items()}
            return max_quiz 
        else: 
            return None 
        
    def get_max_accuracy_per_quiz(self) -> dict | None:
        """
        Return a dictionary with a single key-value pair 
        This key-value pair represents the quiz which this user has max accuracy ration 
        """
        performance = self.__user_performance_per_partial_quiz()
        if performance:
            max_key = max(performance, key=lambda k: performance[k][0])
            return {max_key: performance[max_key]}
        else:
            return None
        
    def get_min_accuracy_per_quiz(self) -> dict | None:
        """
        Return a dictionary with a single key-value pair 
        This key-value pair represents the quiz which this user has min accuracy ration 
        """
        performance = self.__user_performance_per_partial_quiz()
        if performance:
            min_key = min(performance, key=lambda k: performance[k][0])
            return {min_key: performance[min_key]}
        else:
            return None

