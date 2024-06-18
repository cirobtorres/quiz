from django.db.models import QuerySet
from ..serializers import  QuestionSerializer
from ..models import QuestionModel
from ..questions.populate_database import populate_database
from ..serializers import AnswerSerializer
from ..models import QuestionModel, AnswerModel


class QuestionTools:
    question_serializer = QuestionSerializer
    question_model = QuestionModel

    def exists(self, **kwargs) -> bool:
        return self.question_model.objects.filter(**kwargs).exists()

    def get_object(self, **kwargs) -> QuestionModel:
        return self.question_model.objects.get(**kwargs)

    def get_queryset(self, quiz: list[int] = None, size: int = None) -> QuerySet[QuestionModel]:
        if not self.question_model.objects.exists():
            populate_database()
        if quiz:
            return self.question_model.objects.filter(quiz__id__in=quiz).order_by('?')[:size or 10]
        return self.question_model.objects.order_by('?')[:size or 10]


class AnswerTools:
    answer_serializer = AnswerSerializer
    question_model = QuestionModel
    answer_model = AnswerModel
    
    @staticmethod
    def more_than_one_correct(answers):
        correct = 0

        for answer in answers:
            if answer['is_correct'] == True:
                correct += 1
        
        if correct != 1:
            raise ValueError
    
    def get_object(self, **kwargs):
        return self.answer_model.objects.get(**kwargs)


