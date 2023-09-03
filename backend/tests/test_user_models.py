from django.contrib.auth import get_user_model
from django.test import TestCase

from user.models import QuizUser


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
