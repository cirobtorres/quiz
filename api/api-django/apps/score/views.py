from django.http import HttpRequest
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.pagination import PageNumberPagination
from ..quiz.models import QuizModel
from ..user.views import UserUtilities, UserPermissions


class ScoreView(APIView, UserPermissions, UserUtilities):
    authentication_classes = [JWTAuthentication]
    permission_classes = [UserPermissions]
    pagination_class = PageNumberPagination
    http_method_names = ['get', 'post', 'delete', ]

    def get(self, request: HttpRequest, pk: int = None, **kwargs) -> Response:
        user_model = self.get_user()

        if pk:
            try:
                score_model = self.total_score_model.objects.get(pk=pk)
                score_serializer = self.total_score_serializer(instance=score_model)
                return Response(data=score_serializer.data, status=HTTP_200_OK)
            except ObjectDoesNotExist as e:
                # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
                return Response(data={'message': 'Quiz not found'}, status=HTTP_404_NOT_FOUND)
        
        score_queryset = self.total_score_model.objects.filter(user__id=user_model.id).order_by('id')
        data = self.paginate(request, score_queryset, **kwargs)
        return Response(**data)

    def post(self, request: HttpRequest) -> Response:
        user_model = self.get_user()

        try:
            not_valid = user_model.get('invalid')
            if not_valid:
                return Response(**not_valid)
        
        except AttributeError as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            pass
        
        ts = self.total_score_model(user=user_model)
        ts.save()

        scoreIds = []
        score_quiz = request.data.get('score')

        for quiz in score_quiz:
            quiz_pk = quiz.get('quiz_id')
            quiz_model = QuizModel.objects.get(pk=quiz_pk)

            ps = self.partial_score_model(
                quiz=quiz_model,
                total=quiz.get('total_questions'),
                corrects=quiz.get('correct_answers'),
            )

            ps.save()
            ts.scores.add(ps)
            scoreIds.append(ps.pk)
        
        ts_serialized = self.total_score_serializer(instance=ts)

        return Response(data={'message': ts_serialized.data},status=HTTP_201_CREATED)
    
    def delete(self, request: HttpRequest, pk: int = None, **kwargs) -> Response:
        try:
            score_model = self.total_score_model.objects.get(pk=pk)
        except ObjectDoesNotExist as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(data={'message': 'Quiz not found'}, status=HTTP_404_NOT_FOUND)

        score_model.delete()
        
        return Response(data={'message': 'Score deleted'}, status=HTTP_200_OK)

