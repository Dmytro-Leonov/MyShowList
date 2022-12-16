from django.db.models import (
    Subquery,
    OuterRef
)
from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework import (
    generics,
    status
)
from rest_framework.views import APIView

from lists.models import ListShow
from .models import (
    Show,
    UserShowRating,
    Genre,
    Country
)

from .serializers import (
    ShowsSearchSerializer,
    ShowSerializer,
    RateShowSerializer,
    GenreSerializer,
    CountrySerializer
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
                'genres',
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


class RateShow(generics.CreateAPIView):
    serializer_class = RateShowSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        UserShowRating.objects.create(
            user=self.request.user,
            **serializer.validated_data
        )
        response = {'data': 'Your rate recorded.'}
        return Response(data=response, status=status.HTTP_201_CREATED)


class ShowFilters(APIView):
    http_method_names = 'get'

    def get(self, request, *args, **kwargs):
        genres = Genre.objects.all()
        countries = Country.objects.all()
        response = {
            'genres': GenreSerializer(genres, many=True).data,
            'countries': CountrySerializer(countries, many=True).data
        }
        return Response(data=response, status=status.HTTP_200_OK)

