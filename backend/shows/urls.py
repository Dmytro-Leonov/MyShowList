from django.urls import path
from .views import (
    ShowSearch,
    ShowDetails
)

urlpatterns = [
    path('', ShowSearch.as_view(), name='Show Search'),
    path('show/<slug:slug>/', ShowDetails.as_view(), name='Show Details')
]
