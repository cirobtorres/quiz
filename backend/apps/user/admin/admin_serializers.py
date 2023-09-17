from django.conf import settings

if settings.DEBUG:
    from django.contrib.auth import get_user_model

    from rest_framework import serializers

    from apps.quiz.serializers import PreferencesSerializer

    class QuizUserAdminSerializer(serializers.ModelSerializer):
        class Meta:
            model = get_user_model()
            fields = (
                'id',
                'url',
                'username',
                'password',
                'avatar',
                'preferences_user',
                'get_total_correct_answers',
                'score',
                'is_active',
                'is_staff',
                'last_login',
                'created_at',
                'updated_at',
            )
            extra_kwargs = {
                'url': {'view_name': 'user:api-users-detail'},
                'password': {
                    # 'write_only': True,
                    'style': {'input_type': 'password'},
                    'required': False,
                },
            }
            read_only_fields = (
                'id',
                'preferences_user',
                'get_total_correct_answers',
                'score',
                'last_login',
                'created_at',
                'updated_at',
            )

        preferences_user = PreferencesSerializer(many=False, read_only=True)
