from django.contrib import admin

from .models import QuestionModel, AnswerModel, QuizModel, ScoreModel


@admin.register(QuizModel)
class QuizAdmin(admin.ModelAdmin):
    model = QuizModel
    list_display = ['id', 'subject', 'slug']
    list_display_links = ['subject']


@admin.register(AnswerModel)
class AnswerAdmin(admin.ModelAdmin):
    model = AnswerModel


class AnswerInline(admin.TabularInline):
    model = AnswerModel
    fields = ['answer_text', 'is_correct']
    readonly_fields = ['answer_text', 'is_correct']
    extra = 0


@admin.register(QuestionModel)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ['id', 'question_text']
    list_display_links = ['question_text']
    search_fields = ['question_text']
    inlines = [AnswerInline]

    def has_add_permission(self, request, obj=None):
        # Disable new questions
        return False

    def has_delete_permission(self, request, obj=None):
        # Disable delete questions
        return False


@admin.register(ScoreModel)
class ScoreAdmin(admin.ModelAdmin):
    model = ScoreModel
    list_display = [
        'id',
        '__str__',
        'score_user',
        'score_quiz',
        'total_questions',
        'total_correct_answers',
        'get_score_percentage',
        'created_at',
    ]
    list_display_links = ['__str__']

    def get_score_percentage(self, obj):
        return f'{round((obj.total_correct_answers / obj.total_questions) * 100, 2)}%'
