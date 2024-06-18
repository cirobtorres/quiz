from django.http import HttpRequest
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.pagination import PageNumberPagination
from .tools import UserUtilities


class UserListView(APIView, UserUtilities):
    pagination_class = PageNumberPagination
    http_method_names = ['get']

    def get(self, request: HttpRequest, **kwargs) -> Response:
        user_queryset = self.get_queryset(order_by=('-score', 'username'))
        data = self.paginate(request, user_queryset, **kwargs)
        return Response(**data)
    

class ScoreListView(APIView, UserUtilities):
    pagination_class = PageNumberPagination
    http_method_names = ['get',]

    def get(self, request: HttpRequest, **kwargs) -> Response:
        score_queryset = self.score_model.objects.all()
        data = self.paginate(request, score_queryset, **kwargs)
        return Response(**data)
