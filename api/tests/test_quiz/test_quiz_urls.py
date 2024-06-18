from rest_framework.test import APITestCase
from rest_framework.reverse import reverse as rest_reverse


class URLsQuizTestCase(APITestCase):
    app_name = '/api/quiz/'

    def test_root_url(self):
        url_expected = self.app_name + ''
        url_reversed = rest_reverse(viewname='quiz:quiz')

        self.assertEqual(
            url_expected,
            url_reversed,
        )

    def test_root_url_with_pk(self):
        pk = 1
        url_expected = self.app_name + str(pk)
        url_reversed = rest_reverse(viewname='quiz:quiz', kwargs={'pk': pk})

        self.assertEqual(
            url_expected,
            url_reversed,
        )
    
    def test_question_url(self):
        url_expected = self.app_name + 'question'
        url_reversed = rest_reverse(viewname='quiz:question')

        self.assertEqual(
            url_expected,
            url_reversed,
        )
    
    def test_question_url_with_pk(self):
        pk = 1
        url_expected = self.app_name + f'question/{pk}'
        url_reversed = rest_reverse(viewname='quiz:question', kwargs={'pk': pk})

        self.assertEqual(
            url_expected,
            url_reversed,
        )
    
    def test_answer_url(self):
        url_expected = self.app_name + 'answer'
        url_reversed = rest_reverse(viewname='quiz:answer')

        self.assertEqual(
            url_expected,
            url_reversed,
        )
    
    def test_answer_url_with_pk(self):
        pk = 1
        url_expected = self.app_name + f'answer/{pk}'
        url_reversed = rest_reverse(viewname='quiz:answer', kwargs={'pk': pk})

        self.assertEqual(
            url_expected,
            url_reversed,
        )