from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model

UserModel = get_user_model()

class UserAdmin(BaseUserAdmin):
    list_display = ["email"]
    fieldsets = [(None, {"fields": ["email", "password"]}), ("Permissions", {"fields": ["is_admin"]})]
    list_filter = ["is_admin"]
    add_fieldsets = [(None, {"classes": ["wide"], "fields": ["email", "password"]})]
    serach_fields = ["email"]
    ordering = ["email"]
    filter_horizontal = []

admin.site.register(UserModel, UserAdmin)
