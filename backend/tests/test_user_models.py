from django.contrib.auth import get_user_model
from django.test import TestCase

from apps.quiz.models import QuizModel, ScoreModel
from apps.user.models import QuizUser


class UserModelsTestCase(TestCase):
    model = get_user_model()

    def setUp(self) -> None:
        ...

    def test_models_user__str__(self) -> None:
        user_data: dict[str] = {
            'username': 'testuser',
            'password': 'testpassword',
        }
        user = self.model.objects.create_user(**user_data)
        self.assertEqual(str(user), user_data.get('username'))

    def test_models_create_user(self) -> None:
        user_data: dict[str] = {
            'username': 'testuser',
            'password': 'testpassword',
        }
        user = self.model.objects.create_user(**user_data)
        self.assertEqual(user.username, user_data.get('username'))

    def test_models_create_superuser(self) -> None:
        user_data: dict[str] = {
            'username': 'testuser',
            'password': 'testpassword',
        }
        user = self.model.objects.create_superuser(**user_data)
        self.assertEqual(user.username, user_data.get('username'))
        self.assertEqual(user.is_staff, True)
        self.assertEqual(user.is_superuser, True)

    def test_models_create_superuser_is_staff_false(self) -> None:
        user_data: dict[str] = {
            'username': 'testuser',
            'password': 'testpassword',
            'is_staff': False,
        }
        try:
            self.assertRaises(
                ValueError,
                self.model.objects.create_superuser(**user_data)
            )
        except ValueError:
            pass

    def test_models_create_superuser_is_superuser_false(self) -> None:
        user_data: dict[str] = {
            'username': 'testuser',
            'password': 'testpassword',
            'is_superuser': False,
        }
        try:
            self.assertRaises(
                ValueError,
                self.model.objects.create_superuser(**user_data)
            )
        except ValueError:
            pass

    def test_models_create_user_raise_no_username(self) -> None:
        try:
            self.assertRaises(
                ValueError,
                self.model.objects.create_user(
                    username=None,
                    password='testpassword'
                )
            )
        except ValueError:
            pass

    def test_models_get_total_correct_answers(self) -> None:
        user_data: dict[str] = {
            'username': 'testuser',
            'password': 'testpassword',
        }
        user = self.model.objects.create_user(**user_data)
        self.assertEqual(user.get_total_correct_answers(), 0)

        # Test again, but now with scores

        quiz_data: dict[str] = {
            'subject': 'Test Subject',
            'slug': 'test-subject',
            'description': 'Test description',
        }

        quiz = QuizModel.objects.create(**quiz_data)

        score_data_1: dict[str] = {
            'score_user': user,
            'score_quiz': quiz,
            'total_correct_answers': 7,
            'total_questions': 10,
        }

        score = ScoreModel.objects.create(**score_data_1)

        self.assertEqual(user.get_total_correct_answers(), score_data_1.get(
            'total_correct_answers'))

        score_data_2: dict[str] = {
            'score_user': user,
            'score_quiz': quiz,
            'total_correct_answers': 4,
            'total_questions': 10,
        }

        score = ScoreModel.objects.create(**score_data_2)

        self.assertEqual(user.get_total_correct_answers(), score_data_1.get(
            'total_correct_answers') + score_data_2.get('total_correct_answers'))
