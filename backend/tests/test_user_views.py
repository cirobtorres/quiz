from django.urls import reverse
from django.http import HttpResponse
from django.contrib.auth import get_user_model

from rest_framework.status import (
    HTTP_200_OK, HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED, HTTP_404_NOT_FOUND
)
from rest_framework.reverse import reverse as api_reverse
from rest_framework.test import APITestCase

from apps.user.models import QuizUser


class RegisterUserAPIViewsTestCase(APITestCase):

    def setUp(self) -> None:
        ...

    def test_views_user_register_missing_data(self) -> None:
        # Test if register view prevents to save a user instance
        # with empty username or password
        request_1: dict[str] = {
            'username': 'testuser',
        }
        request_2: dict[str] = {
            'password': 'testpassword',
        }
        url: str = api_reverse(viewname='user:register')
        response_1: HttpResponse = self.client.post(path=url, data=request_1)
        response_2: HttpResponse = self.client.post(path=url, data=request_2)
        self.assertEqual(response_1.data.get('message'), 'missing fields')
        self.assertEqual(response_1.status_code, HTTP_400_BAD_REQUEST)
        self.assertEqual(response_2.data.get('message'), 'missing fields')
        self.assertEqual(response_2.status_code, HTTP_400_BAD_REQUEST)

    def test_views_user_register_already_exists(self) -> None:
        user: QuizUser = get_user_model().objects.create(
            username='testuser',
            password='testpassword',
        )
        request: dict[str] = {
            'username': user.username,
            'password': user.password,
        }
        url: str = api_reverse(viewname='user:register')
        response: HttpResponse = self.client.post(path=url, data=request)
        self.assertEqual(
            response.data.get('message'),
            'user already exists',
        )
        self.assertEqual(response.status_code, HTTP_400_BAD_REQUEST)

    def test_views_user_register_serializer_is_valid(self) -> None:
        request: dict[str] = {
            'username': 'testuser',
            'password': 'testpassword',
        }
        url: str = api_reverse(viewname='user:register')
        response: HttpResponse = self.client.post(path=url, data=request)
        self.assertEqual(
            response.data.get('message'),
            'user created successfully',
        )
        self.assertEqual(response.status_code, HTTP_201_CREATED)

    def test_views_user_register_serializer_is_invalid(self) -> None:
        """Test if username or password passes validation"""
        pass
    # TODO: username and password validations has not been implemented yet


class UpdateUserAPIViewsTestCase(APITestCase):

    def setUp(self) -> None:
        ...
