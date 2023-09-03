from string import ascii_letters
from random import choice, choices, randint
from typing import Any
from unittest.mock import patch, mock_open

from django.test import TestCase

from quiz.models import QuizModel, QuestionModel, AnswerModel
from quiz.questions.populate_db import (
    get_list_of_paths,
    save_dict_to_database,
    convert_list_of_json_to_dict,
    populate_database
)


class PopulateDBTestCase(TestCase):

    def setUp(self):

        self.dict_obj = {
            "quiz": {
                "subject": "Test Subject",
                "slug": "test-subject",
                "description": "optional"
            },
            "questions": [
                {
                    "question_text": "Here comes the question text",
                    "answers": [
                        {
                            "answer_text": "The correct answer.",
                            "is_correct": True
                        },
                        {
                            "answer_text": "Second option.",
                            "is_correct": False
                        },
                        {
                            "answer_text": "Third option.",
                            "is_correct": False
                        },
                        {
                            "answer_text": "Fourth option.",
                            "is_correct": False
                        }
                    ]
                },
            ]
        }

        self.any_size: int = randint(10, 100)
        self.any_other_size: int = randint(10, 100)

        self.file_extension: list[str] = ['txt', 'pdf', 'docx', 'doc',
                                          'pptx', 'ppt', 'xlsx', 'xls', 'jpeg', 'png', 'jpg', 'bitmap', 'gif']
        self.json_files: list[str] = [
            f'{"".join(choices(ascii_letters, k=self.any_size))}_{i}.json' for i in range(self.any_size)]
        self.not_json_files: list[str] = [
            f'{"".join(choices(ascii_letters, k=self.any_other_size))}_{i}.{choice(self.file_extension)}'
            for i in range(self.any_other_size)
        ]

    @patch("os.listdir")
    def test_get_list_of_paths(self, mock_listdir) -> None:

        def lambda_function(path, end): return path.endswith(end)

        mock_listdir.return_value = self.json_files
        mock_listdir.return_value += self.not_json_files
        mock_listdir.return_value.sort()

        paths = get_list_of_paths()

        self.assertEqual(
            len(paths),
            self.any_size,
        )

        self.assertTrue(
            all([
                lambda_function(path, '.json') for path in paths
            ])
        )

        self.assertFalse(
            any([
                lambda_function(path, choice(self.file_extension)) for path in paths
            ])
        )

    def test_save_dict_to_database_default_slugfication_behavior(self) -> None:

        save_dict_to_database([self.dict_obj])

        self.assertEqual(
            QuizModel.objects.first().slug,
            "test-subject"
        )

    def test_save_dict_to_database_quiz_model_is_saved_correctly_to_question_object(self) -> None:

        save_dict_to_database([self.dict_obj])

        self.assertEqual(
            QuestionModel.objects.first().quiz,
            QuizModel.objects.first()
        )

    def test_save_dict_to_database_answers_are_correctly_saved_to_question_object(self) -> None:

        save_dict_to_database([self.dict_obj])

        answers = AnswerModel.objects.filter(
            question=QuestionModel.objects.first())

        self.assertTrue(
            answers.first().is_correct
        )

        self.assertFalse(
            any([answer.is_correct for answer in answers[1:]])
        )

        self.assertEqual(
            answers.filter(is_correct=True).first().answer_text,
            "The correct answer."
        )

        self.assertEqual(
            answers.filter(is_correct=False).count(),
            3
        )

    def test_save_dict_to_database_kwargs_shuffle_answers(self) -> None:

        save_dict_to_database(
            [self.dict_obj], shuffle_answers=True, seed_number=1)

        answers_in_random_order: list[AnswerModel] = list(
            AnswerModel.objects.all())

        self.assertNotEqual(
            answers_in_random_order[0].answer_text,
            "The correct answer.",
        )

    def test_save_dict_to_database_the_exact_same_quiz_previously_exists(self) -> None:

        QuizModel.objects.create(
            subject="Test Subject",
            slug="test-subject",
            description="optional"
        ).save()

        save_dict_to_database([self.dict_obj])

        self.assertEqual(
            QuestionModel.objects.first().quiz,
            QuizModel.objects.last()
        )

    @patch('builtins.open', new_callable=mock_open, read_data='{"key": "value"}')
    def test_convert_list_of_json_to_dict(self, mock_file_open) -> None:

        result: dict[str, Any] = convert_list_of_json_to_dict(self.json_files)

        self.assertEqual(
            len(result),
            len(self.json_files)
        )

        for item in result:
            self.assertIsInstance(
                item,
                dict
            )

            self.assertEqual(
                item,
                {"key": "value"}
            )

    @patch('builtins.open', new_callable=mock_open, read_data=None)
    def test_convert_list_of_json_to_dict_but_list_does_not_contain_json_files(self, mock_file_open) -> None:

        result = convert_list_of_json_to_dict(self.not_json_files)

        self.assertNotEqual(
            len(result),
            len(self.not_json_files)
        )

    @patch("quiz.questions.populate_db.convert_list_of_json_to_dict")
    @patch("quiz.questions.populate_db.save_dict_to_database")
    @patch("quiz.questions.populate_db.get_list_of_paths")
    def test_populate_database(self, mock_get_list_of_paths, mock_save_dict_to_database, mock_convert_list_of_json_to_dict) -> None:

        mock_get_list_of_paths.return_value = self.json_files
        mock_convert_list_of_json_to_dict.return_value = [self.dict_obj]
        mock_save_dict_to_database.return_value = None

        populate_database()

        mock_get_list_of_paths.assert_called_once()
        mock_convert_list_of_json_to_dict.assert_called_once()
        mock_save_dict_to_database.assert_called_once()
