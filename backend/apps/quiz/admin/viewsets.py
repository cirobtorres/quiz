from django.conf import settings

if settings.DEBUG:
    from django.http import HttpRequest
    from django.db.models import QuerySet
    from django.contrib.auth import get_user_model

    from rest_framework.viewsets import ModelViewSet
    from rest_framework.authentication import SessionAuthentication
    from rest_framework.permissions import IsAuthenticatedOrReadOnly
    from rest_framework.pagination import PageNumberPagination
    from rest_framework.response import Response
    from rest_framework.status import (
        HTTP_200_OK,
        HTTP_201_CREATED,
        HTTP_400_BAD_REQUEST,
        HTTP_404_NOT_FOUND,
    )

    from ..models import (
        QuizModel,
        QuestionModel,
        AnswerModel,
        ScoreModel,
        PreferencesModel,
    )
    from .admin_serializers import (
        QuizAdminSerializer,
        QuestionAdminSerializer,
        AnswerAdminSerializer,
        ScoreAdminSerializer,
        PreferencesAdminSerializer,
    )

    class QuizModelViewSet(ModelViewSet):
        """
        Friendly API navigation view for django rest framework browsable API users
        """
        authentication_classes = [SessionAuthentication]
        permission_classes = [IsAuthenticatedOrReadOnly]
        pagination_class = PageNumberPagination
        serializer_class = QuizAdminSerializer
        model = QuizModel
        http_method_names = [
            'get',
            'post',
            'put',
            'patch',
            'delete',
            'head',
            'options'
        ]

        def get_object(self, pk: str, **kwargs):
            return self.model.objects.get(pk=pk)

        def get_queryset(self, **kwargs):
            return self.model.objects.all()

        def list(self, request: HttpRequest, **kwargs):
            quizes: QuerySet[QuizModel | None] = self.get_queryset(**kwargs)
            if quizes.exists():
                paginator = self.pagination_class()
                page = paginator.paginate_queryset(quizes, request)
                quizes_serializer: QuizAdminSerializer = self.serializer_class(
                    instance=page,
                    many=True,
                    context={
                        'request': request
                    }
                )
                return paginator.get_paginated_response(quizes_serializer.data)
            return Response(data={'message': 'not found'}, status=HTTP_404_NOT_FOUND)

        def retrieve(self, request: HttpRequest, pk: str = None, **kwargs):
            quiz: QuizModel | None = self.get_object(pk, **kwargs)
            if quiz is None:
                return Response(data={'message': 'not found'}, status=HTTP_404_NOT_FOUND)
            quiz_serializer: QuizAdminSerializer = self.serializer_class(
                instance=quiz,
                context={
                    'request': request
                }
            )
            return Response(data=quiz_serializer.data, status=HTTP_200_OK)

        def create(self, request: HttpRequest, **kwargs):
            quiz_serializer: QuizAdminSerializer = self.serializer_class(
                data=request.data,
                context={
                    'request': request
                }
            )
            if quiz_serializer.is_valid():
                quiz_serializer.save()
                return Response(data=quiz_serializer.data, status=HTTP_201_CREATED)
            return Response(data=quiz_serializer.errors, status=HTTP_400_BAD_REQUEST)

        def update(self, request: HttpRequest, pk: str = None, **kwargs):
            quiz: QuizModel | None = self.get_object(pk, **kwargs)
            if quiz is None:
                return Response(data={'message': 'not found'}, status=HTTP_404_NOT_FOUND)
            quiz_serializer: QuizAdminSerializer = self.serializer_class(
                instance=quiz,
                data=request.data,
                partial=True,
                context={
                    'request': request
                }
            )
            if quiz_serializer.is_valid():
                quiz_serializer.save()
                return Response(data=quiz_serializer.data, status=HTTP_200_OK)
            return Response(data=quiz_serializer.errors, status=HTTP_400_BAD_REQUEST)

        def destroy(self, request: HttpRequest, pk: str = None, **kwargs):
            quiz: QuizModel | None = self.get_object(pk, **kwargs)
            if quiz is None:
                return Response(data={'message': 'not found'}, status=HTTP_404_NOT_FOUND)
            quiz.delete()
            return Response(data={'message': 'deleted'}, status=HTTP_200_OK)

        def partial_update(self, request: HttpRequest, pk: str = None, **kwargs):
            quiz: QuizModel | None = self.get_object(pk, **kwargs)
            if quiz is None:
                return Response(data={'message': 'not found'}, status=HTTP_404_NOT_FOUND)
            quiz_serializer: QuizAdminSerializer = self.serializer_class(
                instance=quiz,
                data=request.data,
                partial=True,
                context={
                    'request': request
                }
            )
            if quiz_serializer.is_valid():
                quiz_serializer.save()
                return Response(data=quiz_serializer.data, status=HTTP_200_OK)
            return Response(data=quiz_serializer.errors, status=HTTP_400_BAD_REQUEST)

    class QuestionModelViewSet(ModelViewSet):
        """
        Friendly API navigation view for django rest framework browsable API users
        """
        authentication_classes = [SessionAuthentication]
        permission_classes = [IsAuthenticatedOrReadOnly]
        pagination_class = PageNumberPagination
        serializer_class = QuestionAdminSerializer
        model = QuestionModel
        http_method_names = [
            'get',
            'post',
            'put',
            'patch',
            'delete',
            'head',
            'options'
        ]

        def get_object(self, pk: str, **kwargs):
            return self.model.objects.get(pk=pk)

        def get_queryset(self, **kwargs):
            return self.model.objects.all()

        def list(self, request: HttpRequest, **kwargs):
            questions: QuerySet[QuestionModel |
                                None] = self.get_queryset(**kwargs)
            if questions.exists():
                paginator = self.pagination_class()
                page = paginator.paginate_queryset(questions, request)
                questions_serializer: QuestionAdminSerializer = self.serializer_class(
                    instance=page,
                    many=True,
                    context={
                        'request': request
                    }
                )
                return paginator.get_paginated_response(questions_serializer.data)
            return Response(data={'message': 'not found'}, status=HTTP_404_NOT_FOUND)

        def retrieve(self, request: HttpRequest, pk: str = None, **kwargs):
            question: QuestionModel | None = self.get_object(pk, **kwargs)
            if question is None:
                return Response(data={'message': 'not found'}, status=HTTP_404_NOT_FOUND)
            question_serializer: QuestionAdminSerializer = self.serializer_class(
                instance=question,
                context={
                    'request': request
                }
            )
            return Response(data=question_serializer.data, status=HTTP_200_OK)

        def create(self, request: HttpRequest, **kwargs):
            question_serializer: QuestionAdminSerializer = self.serializer_class(
                data=request.data,
                context={
                    'request': request
                }
            )
            if question_serializer.is_valid():
                question_serializer.save()
                return Response(data=question_serializer.data, status=HTTP_201_CREATED)
            return Response(data=question_serializer.errors, status=HTTP_400_BAD_REQUEST)

        def update(self, request: HttpRequest, pk: str = None, **kwargs):
            question: QuestionModel | None = self.get_object(pk, **kwargs)
            if question is None:
                return Response(data={'message': 'not found'}, status=HTTP_404_NOT_FOUND)
            question_serializer: QuestionAdminSerializer = self.serializer_class(
                instance=question,
                data=request.data,
                partial=True,
                context={
                    'request': request
                }
            )
            if question_serializer.is_valid():
                question_serializer.save()
                return Response(data=question_serializer.data, status=HTTP_200_OK)
            return Response(data=question_serializer.errors, status=HTTP_400_BAD_REQUEST)

        def destroy(self, request: HttpRequest, pk: str = None, **kwargs):
            question: QuestionModel | None = self.get_object(pk, **kwargs)
            if question is None:
                return Response(data={'message': 'not found'}, status=HTTP_404_NOT_FOUND)
            question.delete()
            return Response(data={'message': 'deleted'}, status=HTTP_200_OK)

        def partial_update(self, request: HttpRequest, pk: str = None, **kwargs):
            question: QuestionModel | None = self.get_object(pk, **kwargs)
            if question is None:
                return Response(data={'message': 'not found'}, status=HTTP_404_NOT_FOUND)
            question_serializer: QuestionAdminSerializer = self.serializer_class(
                instance=question,
                data=request.data,
                partial=True,
                context={
                    'request': request
                }
            )
            if question_serializer.is_valid():
                question_serializer.save()
                return Response(data=question_serializer.data, status=HTTP_200_OK)
            return Response(data=question_serializer.errors, status=HTTP_400_BAD_REQUEST)

    class AnswerModelViewSet(ModelViewSet):
        """
        Friendly API navigation view for django rest framework browsable API users
        """
        authentication_classes = [SessionAuthentication]
        permission_classes = [IsAuthenticatedOrReadOnly]
        pagination_class = PageNumberPagination
        serializer_class = AnswerAdminSerializer
        model = AnswerModel
        http_method_names = [
            'get',
            'post',
            'put',
            'patch',
            'delete',
            'head',
            'options'
        ]

        def get_object(self, pk: str, **kwargs):
            return self.model.objects.get(pk=pk)

        def get_queryset(self, **kwargs):
            return self.model.objects.all()

        def list(self, request: HttpRequest, **kwargs):
            answers: QuerySet[AnswerModel | None] = self.get_queryset(**kwargs)
            if answers.exists():
                paginator = self.pagination_class()
                page = paginator.paginate_queryset(answers, request)
                answers_serializer: AnswerAdminSerializer = self.serializer_class(
                    instance=page,
                    many=True,
                    context={
                        'request': request
                    }
                )
                return paginator.get_paginated_response(answers_serializer.data)
            return Response(data={'message': 'not found'}, status=HTTP_404_NOT_FOUND)

        def retrieve(self, request: HttpRequest, pk: str = None, **kwargs):
            answer: AnswerModel | None = self.get_object(pk, **kwargs)
            if answer is None:
                return Response(data={'message': 'not found'}, status=HTTP_404_NOT_FOUND)
            answer_serializer: AnswerAdminSerializer = self.serializer_class(
                instance=answer,
                context={
                    'request': request
                }
            )
            return Response(data=answer_serializer.data, status=HTTP_200_OK)

        def create(self, request: HttpRequest, **kwargs):
            answer_serializer: AnswerAdminSerializer = self.serializer_class(
                data=request.data,
                context={
                    'request': request
                }
            )
            if answer_serializer.is_valid():
                answer_serializer.save()
                return Response(data=answer_serializer.data, status=HTTP_201_CREATED)
            return Response(data=answer_serializer.errors, status=HTTP_400_BAD_REQUEST)

        def update(self, request: HttpRequest, pk: str = None, **kwargs):
            answer: AnswerModel | None = self.get_object(pk, **kwargs)
            if answer is None:
                return Response(data={'message': 'not found'}, status=HTTP_404_NOT_FOUND)
            answer_serializer: AnswerAdminSerializer = self.serializer_class(
                instance=answer,
                data=request.data,
                partial=True,
                context={
                    'request': request
                }
            )
            if answer_serializer.is_valid():
                answer_serializer.save()
                return Response(data=answer_serializer.data, status=HTTP_200_OK)
            return Response(data=answer_serializer.errors, status=HTTP_400_BAD_REQUEST)

        def destroy(self, request: HttpRequest, pk: str = None, **kwargs):
            answer: AnswerModel | None = self.get_object(pk, **kwargs)
            if answer is None:
                return Response(data={'message': 'not found'}, status=HTTP_404_NOT_FOUND)
            answer.delete()
            return Response(data={'message': 'deleted'}, status=HTTP_200_OK)

        def partial_update(self, request: HttpRequest, pk: str = None, **kwargs):
            answer: AnswerModel | None = self.get_object(pk, **kwargs)
            if answer is None:
                return Response(data={'message': 'not found'}, status=HTTP_404_NOT_FOUND)
            answer_serializer: AnswerAdminSerializer = self.serializer_class(
                instance=answer,
                data=request.data,
                partial=True,
                context={
                    'request': request
                }
            )
            if answer_serializer.is_valid():
                answer_serializer.save()
                return Response(data=answer_serializer.data, status=HTTP_200_OK)
            return Response(data=answer_serializer.errors, status=HTTP_400_BAD_REQUEST)

    class ScoreModelViewSet(ModelViewSet):
        """
        Friendly API navigation view for django rest framework browsable API users
        """
        authentication_classes = [SessionAuthentication]
        permission_classes = [IsAuthenticatedOrReadOnly]
        pagination_class = PageNumberPagination
        serializer_class = ScoreAdminSerializer
        model = ScoreModel
        http_method_names = [
            'get',
            'post',
            'put',
            'patch',
            'delete',
            'head',
            'options'
        ]

        def get_object(self, pk: str, **kwargs):
            return self.model.objects.get(pk=pk)

        def get_queryset(self, **kwargs):
            return self.model.objects.all()

        def list(self, request: HttpRequest, **kwargs):
            scores: QuerySet[ScoreModel | None] = self.get_queryset(**kwargs)
            if scores.exists():
                paginator = self.pagination_class()
                page = paginator.paginate_queryset(scores, request)
                scores_serializer: ScoreAdminSerializer = self.serializer_class(
                    instance=page,
                    many=True,
                    context={
                        'request': request
                    }
                )
                return paginator.get_paginated_response(scores_serializer.data)
            return Response(data={'message': 'not found'}, status=HTTP_404_NOT_FOUND)

        def retrieve(self, request: HttpRequest, pk: str = None, **kwargs):
            score: ScoreModel | None = self.get_object(pk, **kwargs)
            if score is None:
                return Response(data={'message': 'not found'}, status=HTTP_404_NOT_FOUND)
            score_serializer: ScoreAdminSerializer = self.serializer_class(
                instance=score,
                context={
                    'request': request
                }
            )
            return Response(data=score_serializer.data, status=HTTP_200_OK)

        def create(self, request: HttpRequest, **kwargs):
            score_serializer: ScoreAdminSerializer = self.serializer_class(
                data=request.data,
                context={
                    'request': request
                }
            )
            if score_serializer.is_valid():
                score_serializer.save()
                return Response(data=score_serializer.data, status=HTTP_201_CREATED)
            return Response(data=score_serializer.errors, status=HTTP_400_BAD_REQUEST)

        def update(self, request: HttpRequest, pk: str = None, **kwargs):
            score: ScoreModel | None = self.get_object(pk, **kwargs)
            if score is None:
                return Response(data={'message': 'not found'}, status=HTTP_404_NOT_FOUND)
            score_serializer: ScoreAdminSerializer = self.serializer_class(
                instance=score,
                data=request.data,
                partial=True,
                context={
                    'request': request
                }
            )
            if score_serializer.is_valid():
                score_serializer.save()
                return Response(data=score_serializer.data, status=HTTP_200_OK)
            return Response(data=score_serializer.errors, status=HTTP_400_BAD_REQUEST)

        def destroy(self, request: HttpRequest, pk: str = None, **kwargs):
            score: ScoreModel | None = self.get_object(pk, **kwargs)
            if score is None:
                return Response(data={'message': 'not found'}, status=HTTP_404_NOT_FOUND)
            score.delete()
            return Response(data={'message': 'deleted'}, status=HTTP_200_OK)

        def partial_update(self, request: HttpRequest, pk: str = None, **kwargs):
            score: ScoreModel | None = self.get_object(pk, **kwargs)
            if score is None:
                return Response(data={'message': 'not found'}, status=HTTP_404_NOT_FOUND)
            score_serializer: ScoreAdminSerializer = self.serializer_class(
                instance=score,
                data=request.data,
                partial=True,
                context={
                    'request': request
                }
            )
            if score_serializer.is_valid():
                score_serializer.save()
                return Response(data=score_serializer.data, status=HTTP_200_OK)
            return Response(data=score_serializer.errors, status=HTTP_400_BAD_REQUEST)

    class PreferencesModelViewSet(ModelViewSet):
        """
        Friendly API navigation view for django rest framework browsable API users
        """
        authentication_classes = [SessionAuthentication]
        permission_classes = [IsAuthenticatedOrReadOnly]
        pagination_class = PageNumberPagination
        serializer_class = PreferencesAdminSerializer
        model = PreferencesModel
        http_method_names = [
            'get',
            'post',
            'put',
            'patch',
            'delete',
            'head',
            'options'
        ]

        def get_object(self, pk: str, **kwargs):
            return self.model.objects.get(pk=pk)

        def get_queryset(self, **kwargs):
            return self.model.objects.all()

        def list(self, request: HttpRequest, **kwargs):
            preferences: QuerySet[PreferencesModel |
                                  None] = self.get_queryset(**kwargs)
            if preferences.exists():
                paginator = self.pagination_class()
                page = paginator.paginate_queryset(preferences, request)
                preferences_serializer: PreferencesAdminSerializer = self.serializer_class(
                    instance=page,
                    many=True,
                    context={
                        'request': request
                    }
                )
                return paginator.get_paginated_response(preferences_serializer.data)
            return Response(data={'message': 'not found'}, status=HTTP_404_NOT_FOUND)

        def retrieve(self, request: HttpRequest, pk: str = None, **kwargs):
            preferency: PreferencesModel | None = self.get_object(
                pk, **kwargs)
            if preferency is None:
                return Response(data={'message': 'not found'}, status=HTTP_404_NOT_FOUND)
            preferency_serializer: PreferencesAdminSerializer = self.serializer_class(
                instance=preferency,
                context={
                    'request': request
                }
            )
            return Response(data=preferency_serializer.data, status=HTTP_200_OK)

        def create(self, request: HttpRequest, **kwargs):
            preferency_serializer: PreferencesAdminSerializer = self.serializer_class(
                data=request.data,
                context={
                    'request': request
                }
            )
            if preferency_serializer.is_valid():
                preferency_serializer.save()
                return Response(data=preferency_serializer.data, status=HTTP_201_CREATED)
            return Response(data=preferency_serializer.errors, status=HTTP_400_BAD_REQUEST)

        def update(self, request: HttpRequest, pk: str = None, **kwargs):
            preferency: PreferencesModel | None = self.get_object(
                pk, **kwargs)
            if preferency is None:
                return Response(data={'message': 'not found'}, status=HTTP_404_NOT_FOUND)
            preferency_serializer: PreferencesAdminSerializer = self.serializer_class(
                instance=preferency,
                data=request.data,
                partial=True,
                context={
                    'request': request
                }
            )
            if preferency_serializer.is_valid():
                preferency_serializer.save()
                return Response(data=preferency_serializer.data, status=HTTP_200_OK)
            return Response(data=preferency_serializer.errors, status=HTTP_400_BAD_REQUEST)

        def destroy(self, request: HttpRequest, pk: str = None, **kwargs):
            preferency: PreferencesModel | None = self.get_object(
                pk, **kwargs)
            if preferency is None:
                return Response(data={'message': 'not found'}, status=HTTP_404_NOT_FOUND)
            preferency.delete()
            return Response(data={'message': 'deleted'}, status=HTTP_200_OK)

        def partial_update(self, request: HttpRequest, pk: str = None, **kwargs):
            preferency: PreferencesModel | None = self.get_object(
                pk, **kwargs)
            if preferency is None:
                return Response(data={'message': 'not found'}, status=HTTP_404_NOT_FOUND)
            preferency_serializer: PreferencesAdminSerializer = self.serializer_class(
                instance=preferency,
                data=request.data,
                partial=True,
                context={
                    'request': request
                }
            )
            if preferency_serializer.is_valid():
                preferency_serializer.save()
                return Response(data=preferency_serializer.data, status=HTTP_200_OK)
            return Response(data=preferency_serializer.errors, status=HTTP_400_BAD_REQUEST)
