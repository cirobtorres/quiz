from django.conf import settings

if settings.DEBUG:
    from django.contrib import admin
    from django.contrib.auth import get_user_model

    from user.types import QuizUser

    @admin.register(get_user_model())
    class QuizUserAdmin(admin.ModelAdmin):
        model: QuizUser = get_user_model()
        list_display = (
            'id', 'username', 'avatar', 'is_active', 'is_staff',
            'is_superuser', 'last_login', 'created_at', 'updated_at'
        )
        list_display_links = ('id', 'username', 'avatar')
        list_filter = ('is_staff', 'is_superuser')
        search_fields = ('username',)
        readonly_fields = ('id', 'last_login', 'created_at', 'updated_at')
        ordering = ('-created_at',)
        fieldsets = (
            ("Main Info", {
             'fields': ('id', 'username', 'avatar', 'password')}),
            ("Boolean", {'fields': ('is_active', 'is_staff', 'is_superuser')}),
            ("Datetime", {
             'fields': ('last_login', 'created_at', 'updated_at')}),
            ("Groups", {'fields': ('groups',)}),
            ("User Permissions", {'fields': ('user_permissions',)}),
        )
