from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.UserLogin.as_view()),
    path('register/', views.UserRegister.as_view()),
    path('logged/', views.UserLogged.as_view()),
    path('userinfo/<uuid:uid>', views.UserInfo.as_view()),
    path('logout/', views.UserLogout.as_view()),
]