from django.urls import path
from . import views
from django.urls import path, include
from . import views
from rest_framework import routers
from .views import UserUpdateView
router = routers.SimpleRouter()


urlpatterns = [
    path('users/', views.UserListView.as_view(), name='user-list'),
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('user/<str:username_or_email>/', UserUpdateView.as_view(), name='user-update'),


    # Otras URL de tu aplicación
]




urlpatterns += router.urls