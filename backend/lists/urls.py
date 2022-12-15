from django.urls import path
from .views import (
    GetUserListShows,
    AddToList
)

urlpatterns = [
    path('list/', GetUserListShows.as_view(), name='Get User List Shows'),
    path('add-show/', AddToList.as_view(), name='Add to List'),
]
