from rest_framework.test import APITestCase

from apps.quiz.models import (
    QuestionModel,
    AnswerModel,
)
from apps.quiz.serializers import (
    QuestionSerializer,
)


class QuizSerializersAPITestCase(APITestCase):

    def setUp(self) -> None:

        self.question_object: dict[str] = {
            'question_text': 'Test Question',
        }

        self.question_model: QuestionModel = \
            QuestionModel.objects.create(**self.question_object)

        self.answer_object: list[dict[str]] = [
            {
                'answer_question': self.question_model,
                'answer_text': f'Answer Option {i}',
                'is_correct': True if i == 0 else False,
            }
            for i in range(4)
        ]

        self.answer_model: list[AnswerModel] = list()

        for answer in self.answer_object:
            self.answer_model.append(AnswerModel.objects.create(**answer))

        self.question_serializer: QuestionSerializer = QuestionSerializer()

    def test_serializers_question_get_shuffled_answers(self) -> None:

        # Checks if answer array related to that question instance
        # is in the correct order as they were created
        self.assertEqual(
            list(self.question_model.answer.all()),
            self.answer_model,
        )

        # Checks if the answers are being shuffled by
        # get_shuffled_answers()'s serializer method
        self.assertNotEqual(
            self.question_serializer.
            get_shuffled_answers(instance=self.question_model),
            self.answer_model,
        )

    # def test_serializers_question_get_correct_answer(self) -> None:
    #     # This is a test for a method that is no longer being used in
    #     # QuestionSerializer, but its still present in the QuestionModel
    #     self.assertEqual(
    #         self.question_serializer.\
    #             get_correct_answer(instance=self.question_model),
    #         self.answer_model[0].answer_text,
    #     )
