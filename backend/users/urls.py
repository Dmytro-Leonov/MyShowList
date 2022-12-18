from django.urls import path
from knox import views as knox_views
from .views import (
    GoogleAuth,
    CurrentUserView
)

app_name = 'Users'
urlpatterns = [
    path('auth/google/', GoogleAuth.as_view(), name='Google Auth'),
    path('logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('logout-all/', knox_views.LogoutAllView.as_view(), name='knox_logout_all'),
    path('current/', CurrentUserView.as_view(), name='Current User')
]
