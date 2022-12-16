from django.urls import path
from .views import (
    ShowSearch,
    ShowDetails,
    RateShow,
    ShowFilters
)

urlpatterns = [
    path('', ShowSearch.as_view(), name='Show Search'),
    path('show/rate/', RateShow.as_view(), name='Rate Show'),
    path('show/<slug:slug>/', ShowDetails.as_view(), name='Show Details'),
    path('filters/', ShowFilters().as_view(), name='Show Filters')
]
