from django.conf import settings

if settings.DEBUG:
    from django.contrib.auth import get_user_model

    from rest_framework import serializers

    from quiz.serializers import ScoreSerializer

    class QuizUserAdminSerializer(serializers.ModelSerializer):
        class Meta:
            model = get_user_model()
            fields = (
                'id',
                'url',
                'username',
                'password',
                'avatar',
                # 'score_user',
                # 'get_highest_score',
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
                # 'score_user',
                # 'get_highest_score',
                'score',
                'last_login',
                'created_at',
                'updated_at',
            )

        # score_user = ScoreSerializer(many=True)

        # def get_highest_score(self, instance):
        #     return instance.get_highest_score()
