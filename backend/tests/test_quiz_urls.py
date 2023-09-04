from django.test import TestCase
from django.urls import reverse
from django.http import HttpResponse

from rest_framework.test import APITestCase
from rest_framework.reverse import reverse as reverse_api
from rest_framework.status import HTTP_200_OK

from apps.quiz.models import QuizModel, QuestionModel, ScoreModel
from apps.user.models import QuizUser


class UrlsTestCase(APITestCase):

    def test_urls_get_all_questions(self) -> None:

        url_expected: str = '/api/quiz/question'
        url_reversed: str = reverse_api(viewname='quiz:questions')

        self.assertEqual(
            url_expected,
            url_reversed,
        )

    def test_urls_get_single_question(self) -> None:

        url_expected: str = f'/api/quiz/question/1'
        url_reversed: str = reverse_api(
            viewname='quiz:questions',
            kwargs={
                'pk': 1
            }
        )

        self.assertEqual(
            url_expected,
            url_reversed,
        )

    def test_urls_score_get(self) -> None:

        url_expected: str = '/api/quiz/score'
        url_reversed: str = reverse_api('quiz:score')
        url_get_response: str = self.client.get(url_expected)

        self.assertEqual(
            url_expected,
            url_reversed,
        )

        self.assertEqual(
            url_get_response.status_code,
            HTTP_200_OK,
        )

    def test_urls_score_post(self) -> None:

        quiz: QuizModel = QuizModel.objects.create(
            **{
                'subject': 'My Quiz to Test this URL',
                'slug': 'my-quiz-to-test-this-url',
                'description': 'Test Test 123 456',
            }
        )

        quiz_user: QuizUser = QuizUser.objects.create(
            username='testuser',
        )

        score: ScoreModel = ScoreModel.objects.create(
            **{
                'score_user': quiz_user,
                'score_quiz': quiz,
                'total_questions': 10,
                'total_correct_answers': 6,
            }
        )

        url_expected: str = '/api/quiz/score/1'
        url_reversed: str = reverse_api(
            viewname='quiz:score',
            kwargs={
                'pk': score.pk
            }
        )
        url_get_response: HttpResponse = self.client.get(url_reversed)

        self.assertEqual(
            url_expected,
            url_reversed,
        )

        self.assertEqual(
            url_get_response.status_code,
            HTTP_200_OK,
        )
