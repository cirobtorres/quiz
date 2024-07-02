from rest_framework.test import APITestCase
from rest_framework.reverse import reverse as rest_reverse


class URLsUserTestCase(APITestCase):
    app_name = '/api/user/'

    def test_list_url(self):
        url_expected = self.app_name + 'list'
        url_reversed = rest_reverse(viewname='user:list')

        self.assertEqual(
            url_expected,
            url_reversed,
        )

    def test_register_url(self):
        url_expected = self.app_name + 'register'
        url_reversed = rest_reverse(viewname='user:register')

        self.assertEqual(
            url_expected,
            url_reversed,
        )
    
    def test_token_access_url(self):
        url_expected = self.app_name + 'token-access'
        url_reversed = rest_reverse(viewname='user:token-access')

        self.assertEqual(
            url_expected,
            url_reversed,
        )
    
    def test_token_refresh_url(self):
        url_expected = self.app_name + 'token-refresh'
        url_reversed = rest_reverse(viewname='user:token-refresh')

        self.assertEqual(
            url_expected,
            url_reversed,
        )
    
    def test_token_verify_url(self):
        url_expected = self.app_name + 'token-verify'
        url_reversed = rest_reverse(viewname='user:token-verify')

        self.assertEqual(
            url_expected,
            url_reversed,
        )
    
    def test_update_url(self):
        url_expected = self.app_name + 'update'
        url_reversed = rest_reverse(viewname='user:update')

        self.assertEqual(
            url_expected,
            url_reversed,
        )
    
    def test_get_data_url(self):
        url_expected = self.app_name + 'get-data'
        url_reversed = rest_reverse(viewname='user:get-data')

        self.assertEqual(
            url_expected,
            url_reversed,
        )
    
    def test_delete_url(self):
        url_expected = self.app_name + 'delete'
        url_reversed = rest_reverse(viewname='user:delete')

        self.assertEqual(
            url_expected,
            url_reversed,
        )

