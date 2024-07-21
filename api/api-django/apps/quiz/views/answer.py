from django.http import HttpRequest
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK, 
    HTTP_201_CREATED, 
    HTTP_400_BAD_REQUEST, 
    HTTP_404_NOT_FOUND 
)
from .tools import AnswerTools
from ..serializers import AnswerSerializer
from ..models import QuestionModel, AnswerModel


class AnswerView(APIView, AnswerTools):
    http_method_names = ['post', 'put', ]

    def post(self, request: HttpRequest) -> Response:
        """
        Creates a new collection of answers for a specific "question_id"

        "is_correct" is always presumed to be the first answer sent
        """
        question_id = request.data.get('question_id')

        question = QuestionModel.objects.filter(pk=question_id)

        if not question.exists():
            return Response(data={'message': 'Question does not exists'}, status=HTTP_404_NOT_FOUND)
        
        if question.first().answers.all():
            return Response(
                data={
                    'message': 'This question already has answers attached to it. ' + \
                    'No more than 4 answers are allowed per question'}, 
                status=HTTP_400_BAD_REQUEST
            )

        answers = request.data.get('answers')

        count = 0
        
        for answer in answers:
            count += 1

            if answer.get('is_correct'): # This data is not supposed to be sent from frontend
                del answer['is_correct']

            if count == 1:
                new_answer = AnswerModel.objects.create(question_id=question_id, is_correct=True, **answer)
            else:
                new_answer = AnswerModel.objects.create(question_id=question_id, is_correct=False, **answer)

            new_answer.save()

        return Response(data={'message': 'Answers created'}, status=HTTP_201_CREATED)

    def put(self, request: HttpRequest) -> Response:
        question_id = request.data.get('question_id')
        answers = request.data.get('answers')
        
        for answer in answers:
            pk, text = answer.values()
            new_answer = self.get_object(pk=pk)
            new_answer.text = text
            new_answer.save()
        
        answer_model = AnswerModel.objects.filter(question_id=question_id)

        answer_serializer = AnswerSerializer(instance=answer_model, many=True)

        return Response(data=answer_serializer.data, status=HTTP_200_OK)


