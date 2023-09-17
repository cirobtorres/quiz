from collections import defaultdict
from re import search
from typing import TypedDict

from django.contrib.auth import get_user_model

from rest_framework.validators import ValidationError as DRFValidationError


class QuizUser(TypedDict):
    username: str
    password: str


UserModel: QuizUser = get_user_model()
username = str
password = str


class QuizUserValidator:
    user_model: QuizUser = UserModel

    def __init__(
        self,
        data: dict,
        errors: dict = None,
        errorClass: Exception = None,
        *args,
        **kwargs
    ) -> None:
        self.errors = defaultdict(list) if errors is None else errors
        self.errorClass = DRFValidationError if errorClass is None else errorClass
        self.data = data
        self.clean()

    def clean(self) -> None:
        self.clean_username()
        self.clean_password()

        if self.errors:
            # return self.errorClass(self.errors)
            raise self.errorClass(self.errors)

    def clean_username(self) -> username:
        username: str = self.data.get('username')
        if self.user_model.objects.filter(username=username).exists():
            self.errors['username'].append(
                self.errorClass(detail='Este usuário já esá em uso')
            )
        if search(pattern=r'\W', string=username):
            self.errors['username'].append(
                self.errorClass(
                    detail='Usuário não pode ter caracteres especiais ou espaços em branco'
                )
            )
        if search(pattern=r'\d', string=username):
            self.errors['username'].append(
                self.errorClass(
                    detail='Usuário não pode ter dígitos'
                )
            )
        if len(username) < 4 or len(username) > 32:
            self.errors['username'].append(
                self.errorClass(
                    detail='Usuário não pode ter menos de quatro ou mais de trinta e dois caracteres'
                )
            )
        return username.lower()

    def clean_password(self) -> password:
        password: str = self.data.get('password')
        if len(password) < 6:
            self.errors['password'].append(
                self.errorClass(
                    detail='Senha não pode ter menos de seis caracteres'
                )
            )
        return password
