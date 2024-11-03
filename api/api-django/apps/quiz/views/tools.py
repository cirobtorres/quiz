from django.http import HttpRequest
from django.db.models import QuerySet
from rest_framework.status import HTTP_200_OK, HTTP_500_INTERNAL_SERVER_ERROR
from ..serializers import  QuizSerializer, QuestionSerializer
from ..models import QuestionModel
# from ..questions.populate_database import populate_database
from ..serializers import AnswerSerializer
from ..models import QuizModel, QuestionModel, AnswerModel


class QuizTools:
    def get_queryset(self, **kwargs) -> QuerySet[QuizModel | None]:
        """
        kwargs:
            - user_id
            - order_by
        
        Ex: Sorting by a single field:
            >>> get_queryset(order_by='id')
        
        Ex: Sorting by multiple fields:
            >>> get_queryset(order_by=('id', 'subject', 'updated_at'))
            >>> get_queryset(order_by=['id', 'subject', 'updated_at'])
        """
        # if not QuizModel.objects.exists():
        #     populate_database()
        user_id = kwargs.get('user_id', None)
        order_by = kwargs.get('order_by', None)
        if user_id:
            queryset = QuizModel.objects.all().filter(user__id=user_id, blocked=False)
        else:
            queryset = QuizModel.objects.all().filter(blocked=False)
        if order_by:
            if hasattr(order_by, '__iter__'):
                return queryset.order_by(*tuple(order_by)) 
            return queryset.order_by(order_by) 
        return queryset


class QuestionTools:
    def exists(self, **kwargs) -> bool:
        return QuestionModel.objects.filter(**kwargs).filter(blocked=False).exists()

    def get_object(self, **kwargs) -> QuestionModel:
        return QuestionModel.objects.get(**kwargs)

    def get_queryset(self, quiz: list[int] = None, size: int = None) -> QuerySet[QuestionModel]:
        if quiz:
            return QuestionModel.objects.filter(quiz__id__in=quiz).filter(quiz__blocked=False).order_by('?')[:size or 10]
        return QuestionModel.objects.filter(quiz__blocked=False).order_by('?')[:size or 10]


class AnswerTools:    
    @staticmethod
    def more_than_one_correct(answers):
        correct = 0

        for answer in answers:
            if answer['is_correct'] == True:
                correct += 1
        
        if correct != 1:
            raise ValueError
    
    def get_object(self, **kwargs):
        return AnswerModel.objects.get(**kwargs)


