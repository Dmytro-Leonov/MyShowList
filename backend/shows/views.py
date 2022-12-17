from django.shortcuts import get_object_or_404
from django.db.models import (
    Subquery,
    OuterRef,
    Count, Prefetch
)

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import (
    generics,
    status
)

from lists.models import ListShow
from .models import (
    Show,
    UserShowRating,
    Genre,
    Country, Franchise, FranchiseShow
)

from .filters import ShowFilter

from .serializers import (
    ShowsSearchSerializer,
    ShowSerializer,
    RateShowSerializer,
    GenreSerializer,
    CountrySerializer, FranchiseSerializer
)


class ShowSearch(generics.ListAPIView):
    serializer_class = ShowsSearchSerializer
    filterset_class = ShowFilter

    def get_queryset(self):
        shows = (
            Show
            .objects
            .only(
                'english_name',
                'slug',
                'poster',
                'category',
                'rating',
                'premiere_date',
                'finale_date'
            )
        )
        if self.request.user.is_authenticated:
            shows = (
                shows
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
                )
            )
        return shows


class ShowDetails(APIView):
    def get(self, request, *args, **kwargs):
        queryset = Show.objects.with_show_details_by_user(self.request.user)
        show = get_object_or_404(
            queryset,
            slug=self.kwargs['slug']
        )

        franchise = Franchise.objects.franchise_shows_by_show_id(show.id)

        response = {
            'show': ShowSerializer(show, context={'request': request}).data,
            'franchise': FranchiseSerializer(franchise).data
        }
        return Response(data=response, status=status.HTTP_200_OK)


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

    def get(self, request, *args, **kwargs):
        genres = Genre.objects.all()
        countries = Country.objects.all()
        response = {
            'genres': GenreSerializer(genres, many=True).data,
            'countries': CountrySerializer(countries, many=True).data
        }
        return Response(data=response, status=status.HTTP_200_OK)
