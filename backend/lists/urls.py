from django.urls import path
from .views import (
    GetUserListShows,
    AddToList,
    DeleteFromList,
    ListsShowCount
)

app_name = 'Lists'
urlpatterns = [
    path('list/', GetUserListShows.as_view(), name='Get User List Shows'),
    path('add-show/', AddToList.as_view(), name='Add to List'),
    path('delete-show/', DeleteFromList.as_view(), name='Delete from List'),
    path('lists-show-count/', ListsShowCount.as_view(), name='Lists Show Count'),
]
