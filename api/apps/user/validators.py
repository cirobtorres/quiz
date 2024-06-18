from re import search
from typing import NewType
from collections import defaultdict
from django.contrib.auth import get_user_model
from rest_framework.validators import ValidationError as DRFValidationError


username = NewType('username', str)
password = NewType('password', str)


class UserValidator:
    user_model = get_user_model()

    def __init__(self, data, errors = None, error_class = None):
        self.data = data
        self.errors = defaultdict(list) if errors is None else errors
        self.error_class = DRFValidationError if error_class is None else error_class
        self.clean()
    
    def clean(self) -> None:
        # return True
        self.clean_username()
        self.clean_password()

        if self.errors:
            raise self.error_class(self.errors)
    
    def clean_username(self) -> username:
        pattern = r'[^A-Za-z0-9_]'
        username = self.data.get('username')
        if self.user_model.objects.filter(username=username).exists():
            self.errors['username'].append('Este usuário já esá em uso')
        if len(username) < 4 or len(username) > 12:
            self.errors['username'].append('Nome de usuário não pode ser menor que 4 nem maior que 12 caracteres')
        if search(pattern, username):
            self.errors['username'].append('Nome de usuário não aceita caracteres especiais')
        return username
    
    def clean_password(self) -> password:
        password = self.data.get('password')
        if len(password) < 4 or len(password) > 12:
            self.errors['password'].append('Senha não pode ser menor que 4 nem maior que 12 caracteres')
        if search(r'\s', password):
            self.errors['password'].append('A senha não deve conter espaços')
        if not search(r'(?=.*[A-Z])', password):
            self.errors['password'].append('A senha deve conter ao menos um caractere maiúsculo')
        if not search(r'(?=.*[a-z])', password):
            self.errors['password'].append('A senha deve conter ao menos um caractere minúsculo')
        if not search(r'(?=.*[0-9])', password):
            self.errors['password'].append('A senha deve conter ao menos um caractere numérico')
        if not search(r'(?=.*[!@#$%&?*^~,.+=\-;:<>\[\]{}\(\)|/\\])', password):
            self.errors['password'].append('A senha deve conter ao menos um caractere especial')
        return password


