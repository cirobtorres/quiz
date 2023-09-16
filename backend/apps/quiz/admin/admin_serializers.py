from django.conf import settings

if settings.DEBUG:
    from rest_framework import serializers

    from apps.quiz.models import (
        QuestionModel,
        AnswerModel,
        QuizModel,
        ScoreModel,
        PreferencesModel,
    )
    from apps.user.admin import QuizUserAdminSerializer

    class QuizAdminSerializer(serializers.ModelSerializer):
        class Meta:
            model = QuizModel
            fields = '__all__'

    class AnswerAdminSerializer(serializers.ModelSerializer):
        class Meta:
            model = AnswerModel
            fields = '__all__'

    class QuestionAdminSerializer(serializers.ModelSerializer):
        class Meta:
            model = QuestionModel
            fields = [
                'id',
                'question_quiz',
                'question_text',
                'get_shuffled_answers',
            ]

        get_shuffled_answers = serializers.SerializerMethodField()

        def get_shuffled_answers(self, instance):
            return instance.get_shuffled_answers()

    class ScoreAdminSerializer(serializers.ModelSerializer):
        class Meta:
            model = ScoreModel
            fields = '__all__'

    class PreferencesAdminSerializer(serializers.ModelSerializer):
        class Meta:
            model = PreferencesModel
            fields = [
                'id',
                'url',
                'question_number',
                'time_to_answer',
                'updated_at',
                'preferences_user',
                'preferences_quiz',
            ]
            extra_kwargs = {
                'url': {'view_name': 'quiz:api-preferences-detail'},
            }
            read_only_fields = (
                'id',
                'updated_at',
            )

        preferences_user = QuizUserAdminSerializer(read_only=True)
