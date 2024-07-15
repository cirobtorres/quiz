import os
import json
from django.core.files import File
from random import shuffle, seed
from typing import List, Dict, Union, TypedDict, Iterable

from django.utils.text import slugify

from ..models import QuestionModel, AnswerModel, QuizModel
from ...media_app.models import CloudinaryUtilities, QuizImageModel


__doc__ = """This module contains functions to start an empty database with questions and answers."""
__all__ = [
    'get_list_of_paths', 
    'convert_list_of_json_to_dict', 
    'save_image_to_path', 
    'save_image_to_cloudinary', 
    'save_questions', 
    'save_quiz', 
    'populate_database', 
]


class Answer(TypedDict):
    text: str
    is_correct: bool


class Question(TypedDict):
    question_text: str
    answers: List[Answer]


class Quiz(TypedDict):
    subject: str
    description: str
    image_path: str
    theme: str
    slug: str
    questions: List[Question]


def get_list_of_paths(**kwargs: str | tuple[str]) -> list[str]:
    """
    Returns a list of path files. "file_paths" works only from backend root directory.

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

    list_from_json: list[dict] = []

    for json_file in json_path:
        with open(file=json_file, mode='r', encoding='utf-8') as file:
            try:
                list_from_json.append(json.load(file))
            except json.JSONDecodeError as e:
                print(f"Error decoding JSON from file {json_file}: {e}")

    return list_from_json


def save_image_to_path(instance, image_path):
    if os.path.exists(image_path):
        with open(image_path, 'rb') as f:
            django_file = File(f)
            instance.image.save(os.path.basename(image_path), django_file, save=True)
    else:
        print(f'Image path does not exist: {image_path}')

def save_image_to_cloudinary(path_to_image):
    cloudinary_image = CloudinaryUtilities.save_image(path_to_image)
    cover = QuizImageModel()

    cover.asset_id = cloudinary_image.get('asset_id')
    cover.public_id = cloudinary_image.get('public_id')
    cover.filename = cloudinary_image.get('original_filename')
    cover.secure_url = cloudinary_image.get('secure_url')
    cover.url = cloudinary_image.get('url')
    cover.type = cloudinary_image.get('format')
    cover.width = cloudinary_image.get('width')
    cover.height = cloudinary_image.get('height')

    cover.save()
    
    return cover


def save_questions(quiz: int | Quiz, questions: Question | List[Question], **kwargs) -> None:
    """
    Saves "questions" to database. 
    "questions" must be of a "Question" type or an iterable (list or dict) of "Question" types.

    kwargs:
        - shuffle_answers: bool; Shuffles answers before saving it to database
        - seed_number: int; Seed
    """

    def save_question(question):
        question_text = question.get('question_text')
        question_answers = question.get('answers')

        if isinstance(quiz, int):
            question_object = QuestionModel.objects.create(text=question_text, quiz_id=quiz)
        else:
            question_object = QuestionModel.objects.create(text=question_text, quiz=quiz)

        if kwargs.get('shuffle_answers', False):
            seed(kwargs.get('seed_number', None))
            shuffle(question_answers)

        for answer in question_answers:
            answer_object = AnswerModel.objects.create(question=question_object, **answer)
            answer_object.save()
    
    if hasattr(questions, '__iter__'):
        for question in questions:
            save_question(question)
    else:
        save_question(questions)


def save_quiz(data: Quiz, **kwargs) -> None:
    """
    Saves "questions" to the database by creating a "quiz" object when not yet saved. 
    "questions" must be of a "Question" type or an iterable (list or dict) of "Question" types. 

    kwargs:
        - shuffle_answers: bool; Shuffles answers before saving it to database
        - seed_number: int; Seed
    """
    quiz_dict = data.pop('quiz')
    questions_list = data.pop('questions')

    quiz_slug = quiz_dict.get('slug', slugify(quiz_dict.get('subject')))
    quiz_queryset = QuizModel.objects.filter(slug=quiz_slug)

    if quiz_queryset.exists():
        quiz = quiz_queryset.get()
        
    else:
        quiz_image = quiz_dict.pop('image_file_name')
        
        if quiz_image:
            abs_path = 'api-django\\apps\\quiz\\questions\\quiz_images'
            path_to_image = os.path.join(os.getcwd(), abs_path, quiz_image)
            quiz = QuizModel(**quiz_dict)
            
            # Save to folder 
            # save_image_to_path(quiz, path_to_image) 
            # quiz.save() 
            
            # Save to cloudinary 
            cover = save_image_to_cloudinary(path_to_image)
            quiz.cover = cover
            quiz.save()
        else:
            print('No image path provided for quiz')

    save_questions(quiz, questions_list, **kwargs)


def populate_database(**kwargs) -> None:
    """
    Starts a populated database with questions and answers from a "JSON" file.
    Only works from JSON files located at "api/apps/quiz/questions/json"
    See "apps/quiz/questions/template.json" for a template of a "JSON" file.

    Keyword arguments:
        - file_type: 'str|tuple[str]' = '.json'
        - file_paths: str = 'quiz/questions/'
        - shuffle_answers: bool; Shuffles answers before saving it to database
        - seed_number: int; Seed
    """

    paths = get_list_of_paths(**kwargs)

    dict_obj = convert_list_of_json_to_dict(paths)

    for item in dict_obj:
        save_quiz(item)

