from django.http import HttpRequest
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST 
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.pagination import PageNumberPagination
from ..quiz.models import QuizModel
from ..user.views import UserUtilities, UserPermissions


class ScoreCompleteView(APIView, UserPermissions, UserUtilities):
    authentication_classes = [JWTAuthentication]
    permission_classes = [UserPermissions]
    http_method_names = ['post',]

    def post(self, request: HttpRequest) -> Response:
        user_model = self.get_user()

        try:
            not_valid = user_model.get('invalid')
            if not_valid:
                return Response(**not_valid)
        
        except AttributeError as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            pass

        score_quiz = request.data.get('quiz')

        print('-' * 100, user_model.__dict__)
        
        ts = self.total_score_model(user=user_model)
        ts.save()

        scoreIds = []

        for quiz in score_quiz:
            quiz_pk = quiz.get('quizId')
            quiz_model = QuizModel.objects.get(pk=quiz_pk)

            ps = self.partial_score_model(
                quiz=quiz_model,
                total=quiz.get('totalQuestions'),
                corrects=quiz.get('correctAnswers'),
            )

            ps.save()
            ts.scores.add(ps)
            scoreIds.append(ps.pk)
        
        ts_serialized = self.total_score_serializer(instance=ts)

        return Response(data={'message': ts_serialized.data},status=HTTP_201_CREATED)
    

class ScoreListView(APIView, UserUtilities):
    pagination_class = PageNumberPagination
    http_method_names = ['get',]

    def get(self, request: HttpRequest, **kwargs) -> Response:
        score_queryset = self.total_score_model.objects.all().order_by('id')
        data = self.paginate(request, score_queryset, **kwargs)
        return Response(**data)

