import os
import json
from random import shuffle, seed
from typing import List, Dict, Union, TypedDict

from django.utils.text import slugify
from django.db.models import QuerySet

from apps.quiz.models import QuestionModel, AnswerModel, QuizModel


__doc__ = """This module contains functions to start an empty database with questions and answers."""
__all__ = [
    'get_list_of_paths',
    'convert_list_of_json_to_dict',
    'save_dict_to_database',
    'populate_database',
]


class Quiz(TypedDict):
    subject: str
    slug: str


class Answer(TypedDict):
    answer_text: str
    is_correct: bool


class Question(TypedDict):
    question_text: str
    answers: List[Answer]


JSON = List[Dict[str, Union[Quiz, List[Question]]]]


def get_list_of_paths(**kwargs: str | tuple[str]) -> list[str]:
    """Returns a list of path files. "file_paths" only works only from backend root directory.

    Keyword arguments:
    - file_type: 'str|tuple[str]' = '.json'
    - file_paths: str = 'quiz/questions/'
    """

    file_type: str | tuple[str] = kwargs.get('file_type', '.json')
    file_paths: str = kwargs.get(
        'file_paths',
        os.path.join(os.path.dirname(__file__), 'json')
    )

    files: list[str] = os.listdir(path=file_paths)

    paths: list[str] = list(
        os.path.join(file_paths, file_path)
        for file_path in files if file_path.endswith(file_type)
    )

    return paths


def convert_list_of_json_to_dict(json_path) -> dict[str]:
    """Converts a list of ".json" files into a list of dictionaries."""

    list_from_json: list[dict] = list()

    for json_file in json_path:

        with open(file=json_file, mode='r', encoding='utf-8') as file:

            try:
                list_from_json.append(json.load(file))
            except:
                pass

    return list_from_json


def save_dict_to_database(dict_obj: JSON, **kwargs) -> None:
    """Saves questions and answers from a "JSON" format file to database."""

    for item in dict_obj:
        quiz_dict: dict[str] = item.pop('quiz')
        quiz_slug: str = quiz_dict.get(
            'slug',
            slugify(quiz_dict.get('subject'))
        )

        quiz: QuerySet[QuizModel] | QuerySet[None] = \
            QuizModel.objects.filter(slug=quiz_slug)

        if not quiz.exists():
            quiz_object: QuizModel = QuizModel.objects.create(**quiz_dict)
            quiz_object.save()
        else:
            quiz_object: QuizModel = QuizModel.objects.get(slug=quiz_slug)

        for question in item.get('questions'):
            question_text: str = question.get('question_text')
            question_answers: list[dict[str | bool]] = question.get('answers')

            question_object: QuestionModel = QuestionModel.objects.\
                create(question_text=question_text, question_quiz=quiz_object)
            question_object.save()

            if kwargs.get('shuffle_answers', False):
                seed(kwargs.get('seed_number', None))
                shuffle(question_answers)

            for answer in question_answers:
                answer_object: AnswerModel = AnswerModel.objects.\
                    create(answer_question=question_object, **answer)
                answer_object.save()


def populate_database(**kwargs) -> None:
    """
    Populates database with questions and answers from a "JSON" file.
    See "apps/quiz/questions/template.json" for a template of a "JSON" file.

    kwargs:
        - shuffle_answers: bool; Shuffles answers before saving it to database
    """

    save_dict_to_database(
        convert_list_of_json_to_dict(
            json_path=get_list_of_paths(**kwargs)
        ), **kwargs
    )
