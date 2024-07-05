from django.http import HttpRequest
from django.db.models import QuerySet
from rest_framework.pagination import PageNumberPagination
from rest_framework.status import HTTP_200_OK, HTTP_500_INTERNAL_SERVER_ERROR
from ..serializers import  QuizSerializer, QuestionSerializer
from ..models import QuestionModel
from ..questions.populate_database import populate_database
from ..serializers import AnswerSerializer
from ..models import QuizModel, QuestionModel, AnswerModel


class QuizTools:
    quiz_model = QuizModel 
    quiz_serializer = QuizSerializer 
    pagination_class = PageNumberPagination

    def get_queryset(self, **kwargs) -> QuerySet[QuizModel | None]:
        """
        Returns a QuerySet of QuizModel or an empty QuerySet

        kwargs:
            - order_by
        
        Ex: Sorting by a single field:
            >>> get_queryset(order_by='id')
        
        Ex: Sorting by multiple fields:
            >>> get_queryset(order_by=('id', 'subject', 'updated_at'))
            >>> get_queryset(order_by=['id', 'subject', 'updated_at'])
        """
        queryset = self.quiz_model.objects.all()
        if kwargs.get('order_by'):
            order_by = kwargs.get('order_by')
            if hasattr(order_by, '__iter__'):
                return queryset.order_by(*tuple(order_by)) 
            return queryset.order_by(order_by) 
        return queryset
    
    def paginate(self, request: HttpRequest, queryset: QuerySet, **kwargs):
        if(queryset.count()):
            
            page = request.query_params.get('page', 1)
            page_size = request.query_params.get('page_size', 10)

            paginator = self.pagination_class()
            paginator.page_size = page_size

            results = paginator.paginate_queryset(queryset, request)

            # This method is not intended to be used with combined querysets (querysets of multiple models)
            if isinstance(queryset.first(), self.quiz_model):
                serializer = self.quiz_serializer(results, many=True)

            else:
                return {
                    'data': {'message': 'Invalid model', 'error': True, }, 
                    'status': HTTP_500_INTERNAL_SERVER_ERROR,
                }
        
        else:
            return {
                'data': {
                    'results': {},
                    'paginator': {
                        'current': 1,
                        'first': 1,
                        'last': 1,
                        'page_size': 0,
                        'total_pages': 1,
                        'previous': None,
                        'next': None,
                    },
                    'error': False,
                }, 
                'status': HTTP_200_OK,
            }

        return { 
            'data': {
                'results': serializer.data,
                'paginator': {
                    'current': int(page),
                    'first': 1,
                    'last': int(paginator.page.paginator.count),
                    'page_size': int(paginator.page_size),
                    'total_pages': paginator.page.paginator.num_pages,
                    'previous': (
                        paginator.get_previous_link()
                        if paginator.get_previous_link() else None
                    ),
                    'next': (
                        paginator.get_next_link()
                        if paginator.get_next_link() else None
                    ),
                },
                'error': False, 
            },
            'status': HTTP_200_OK
        }


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


