from re import search
from typing import NewType
from collections import defaultdict
from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework.validators import ValidationError as DRFValidationError


email = NewType('email', str)
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
        self.clean_email()
        self.clean_username()
        
        if(self.data.get('password')):
            self.clean_password()

        if self.errors:
            raise self.error_class(self.errors)
    
    def clean_email(self) -> email:
        email = self.data.get('email')
        if email: # Email is optional to UserUpdateView
            if not search(r"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$", email):
                self.errors['email'].append('E-mail inválido')
        return email
    
    def clean_username(self) -> username:
        pattern = r'[^A-Za-z0-9_]'
        if self.data.get('username'): # Username is optional to UserUpdateView
            username = self.data.get('username')
            if self.data.get('id'):
                id = self.data.get('id')
                if self.user_model.objects.filter(~Q(id=id), username=username).exists(): # Username is unique, it is not allowed for different user: ~Q(id=id) = different id
                    self.errors['username'].append('Este usuário já esá em uso')
            else :
                if self.user_model.objects.filter(username=username).exists(): # Same username is valid to a same user: ~Q(id=id) = different id
                    self.errors['username'].append('Este usuário já esá em uso')
            if len(username) < 4 or len(username) > 12:
                self.errors['username'].append('Nome de usuário não pode ser menor que 4 nem maior que 12 caracteres')
            if search(pattern, username):
                self.errors['username'].append('Nome de usuário não aceita caracteres especiais')
        return username
    
    def clean_password(self) -> password:
        password = self.data.get('password')
        if password: # Password is optional to UserUpdateView
            if len(password) < 4:
                self.errors['password'].append('Senha não pode ser menor que 4 caracteres')
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

