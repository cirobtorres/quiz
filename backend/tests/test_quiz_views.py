from django.urls import reverse
from django.http import HttpResponse
from django.contrib.auth import get_user_model

from rest_framework.status import (
    HTTP_200_OK, HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
)
from rest_framework.reverse import reverse as api_reverse
from rest_framework.test import APITestCase

from quiz.models import QuestionModel, AnswerModel, QuizModel, ScoreModel
from quiz.serializers import QuestionSerializer, AnswerSerializer, QuizSerializer, ScoreSerializer


class QuizAPIViewsTestCase(APITestCase):

    def setUp(self) -> None:

        quiz_dict: dict[str, str] = {
            'subject': 'Mathematics',
            'slug': 'mathematics',
            'description': 'Mathematics Quiz'
        }

        quiz: QuizModel = QuizModel.objects.create(**quiz_dict).save()

        questions_dict: dict[str, str] = [
            {'quiz': quiz, 'question_text': 'What is 2 + 2?', },
            {'quiz': quiz, 'question_text': 'What is 1 + 1?', },
            {'quiz': quiz, 'question_text': 'What is 2 + 1?', },
        ]

        for question in questions_dict:
            QuestionModel.objects.create(**question).save()

        answers_dict: list[dict[str, str]] = [
            [
                {'answer_text': '4', 'is_correct': True, },
                {'answer_text': '1', 'is_correct': False, },
                {'answer_text': '2', 'is_correct': False, },
                {'answer_text': '3', 'is_correct': False, },
            ],
            [
                {'answer_text': '2', 'is_correct': True, },
                {'answer_text': '1', 'is_correct': False, },
                {'answer_text': '4', 'is_correct': False, },
                {'answer_text': '3', 'is_correct': False, },
            ],
            [
                {'answer_text': '3', 'is_correct': True, },
                {'answer_text': '1', 'is_correct': False, },
                {'answer_text': '2', 'is_correct': False, },
                {'answer_text': '4', 'is_correct': False, },
            ],
        ]

        for question_id, answer_obj in enumerate(answers_dict, start=1):
            for answer_dict in answer_obj:
                AnswerModel.objects.create(
                    question=QuestionModel.objects.get(id=question_id),
                    **answer_dict
                ).save()

    def test_views_questions_retrieve_single_question(self) -> None:

        question: QuestionModel = QuestionModel.objects.order_by('?').first()
        serializer: QuestionSerializer = QuestionSerializer(instance=question)

        url: str = api_reverse(
            viewname='quiz:questions',
            kwargs={
                'pk': question.id
            }
        )

        response: HttpResponse = self.client.get(url)

        self.assertEqual(
            response.status_code,
            HTTP_200_OK
        )

        self.assertEquals(
            len(serializer.data),
            len(response.data),
            1
        )

    def test_views_questions_retrieve_a_question_that_doesnt_exist(self) -> None:

        url: str = api_reverse(
            viewname='quiz:questions',
            kwargs={
                'pk': 0
            }
        )

        response: HttpResponse = self.client.get(url)

        self.assertEqual(
            response.status_code,
            HTTP_404_NOT_FOUND
        )

    def test_views_questions_list_questions(self) -> None:

        url: str = api_reverse(viewname='quiz:questions')

        response: HttpResponse = self.client.get(url)

        self.assertEqual(
            response.status_code,
            HTTP_200_OK
        )

        questions: QuestionModel = QuestionModel.objects.order_by('?')
        serializer: QuestionSerializer = QuestionSerializer(
            instance=questions, many=True)

        self.assertEqual(
            len(serializer.data),
            len(response.data)
        )

    def test_score_get_object_does_not_exist_http_404(self) -> None:

        url: str = api_reverse(
            viewname='quiz:score',
            kwargs={
                'pk': 1
            }
        )

        response: HttpResponse = self.client.get(url)

        self.assertEqual(
            response.status_code,
            HTTP_404_NOT_FOUND
        )

    def test_views_score_post_method(self) -> None:

        quiz: QuizModel = QuizModel.objects.create(
            subject='Physics',
            slug='physics',
            description='Physics Quiz',
        )

        quiz_user = get_user_model().objects.create(
            username='testname',
        )

        score: ScoreModel = ScoreModel.objects.create(
            quiz_user=quiz_user,
            quiz=quiz,
            total_questions=1,
            total_correct_answers=1,
        )

        score_serializer: ScoreSerializer = ScoreSerializer(instance=score)
        score_serializer_data: dict[str, str] = score_serializer.data

        url: str = api_reverse(viewname='quiz:score')

        response: HttpResponse = self.client.post(
            path=url, data=score_serializer_data, format='json')

        self.assertEqual(
            response.status_code,
            HTTP_201_CREATED,
        )

        score_serializer_data_invalid: dict[str, str] = {
            'quiz_user': 1,
            'quiz': 0,
            'total_questions': 1,
            'total_correct_answers': 1,
        }

        response: HttpResponse = self.client.post(
            path=url, data=score_serializer_data_invalid, format='json')

        self.assertEqual(
            response.status_code,
            HTTP_400_BAD_REQUEST,
        )


class APIViewsEmptyDatabaseTestCase(APITestCase):

    def test_views_question_populate_database_if_empty(self) -> None:

        url: str = api_reverse(viewname='quiz:questions')

        response: HttpResponse = self.client.get(url)

        self.assertEqual(
            response.status_code,
            HTTP_200_OK,
        )

        questions: QuestionModel = QuestionModel.objects.order_by('?')[:10]
        serializer: QuestionSerializer = QuestionSerializer(
            instance=questions, many=True)

        self.assertEqual(
            len(serializer.data),
            len(response.data),
        )
