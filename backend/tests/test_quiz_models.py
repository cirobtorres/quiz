from django.test import TestCase

from quiz.models import (
    QuizModel,
    QuestionModel,
    AnswerModel,
    ScoreModel
)


class QuizModelsTestCase(TestCase):

    def setUp(self) -> None:

        self.quiz_object: dict[str] = {
            'subject': 'The Quiz For My Test',
            'slug': 'the-quiz-for-my-test',
            'description': 'This is Optional',
        }

        self.quiz_model: QuizModel = QuizModel.objects.create(
            **self.quiz_object)

        self.question_object: dict[str] = {
            'quiz': self.quiz_model,
            'question_text': 'Test Question',
        }

        self.question_model: QuestionModel = QuestionModel.objects.create(
            **self.question_object)

        self.answer_object: list[dict[str]] = [
            {
                'question': self.question_model,
                'answer_text': f'Answer Option {i}',
                'is_correct': True if i == 0 else False,
            }
            for i in range(4)
        ]

        self.answer_model: list[AnswerModel] = list()

        for answer in self.answer_object:
            self.answer_model.append(AnswerModel.objects.create(**answer))

        self.score_percentage: dict[int] = {
            'total_questions': 10,
            'total_correct_answers': 5,
        }

        self.get_score_percentage: float = round(
            self.score_percentage['total_correct_answers']
            / self.score_percentage['total_questions']
            * 100
        )

        self.score_object: dict[str] = {
            'quiz': self.quiz_model,
            **self.score_percentage,
        }

        self.score_model: ScoreModel = ScoreModel.objects.create(
            **self.score_object)

    def test_models_quiz__str__(self) -> None:
        self.assertEqual(
            str(self.quiz_model),
            self.quiz_object['subject'],
        )

    def test_models_question__str__(self) -> None:
        self.assertEqual(
            str(self.question_model),
            self.question_object['question_text'],
        )

    def test_models_question_get_shuffled_answers(self) -> None:

        every_answer_from_question_model_in_list: list[AnswerModel] = \
            list(self.question_model.answer.all())

        self.assertEqual(
            every_answer_from_question_model_in_list,
            list(AnswerModel.objects.all()),
        )

        self.assertNotEqual(
            every_answer_from_question_model_in_list,
            self.question_model.get_shuffled_answers(seed_number=1),
        )

    def test_models_question_get_correct_answer(self) -> None:

        self.assertTrue(
            self.question_model.get_correct_answer()
        )

    def test_models_answer__str__(self) -> None:

        index: int = 0

        for answer in self.answer_model:

            self.assertEqual(
                str(answer),
                f'Answer Option {index}'
            )

            index += 1

    def test_models_score__str__(self) -> None:

        self.assertEqual(
            str(self.score_model),
            f"Corrects: {self.get_score_percentage}% " +
            f"Quiz: {self.quiz_object['subject']}",
        )

    def test_models_score_get_score_percentage(self) -> None:

        self.assertEqual(
            self.score_model.get_score_percentage(),
            f"{round(self.get_score_percentage)}%",
        )
