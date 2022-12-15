from django.db.models import Subquery, OuterRef
from rest_framework.response import Response
from rest_framework import generics

from django.shortcuts import get_object_or_404

from lists.models import ListShow
from .models import UserShowRating
from .models.show import Show

from .serializers import (
    ShowsSearchSerializer,
    ShowSerializer
)


class ShowSearch(generics.ListAPIView):
    serializer_class = ShowsSearchSerializer

    def get_queryset(self):
        return Show.objects.all().only(
            'english_name',
            'slug',
            'poster',
            'category',
            'rating',
            'premiere_date',
            'finale_date'
        )


class ShowDetails(generics.RetrieveAPIView):
    serializer_class = ShowSerializer

    def get_object(self):
        show = get_object_or_404(
            Show
            .objects
            .prefetch_related(
                'countries',
                'show_people',
                'show_people__person'
            )
            .annotate(
                my_list=Subquery(
                    ListShow.objects.filter(
                        user=self.request.user,
                        show=OuterRef('id')
                    )
                    .values('list_type'),
                ),
                my_rate=Subquery(
                    UserShowRating.objects.filter(
                        user=self.request.user,
                        show=OuterRef('id')
                    )
                    .values('rating'),
                )
            ),
            slug=self.kwargs['slug']
        )
        return show
