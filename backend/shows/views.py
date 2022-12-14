from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import (
    generics,
    status,
    permissions
)

from .models import (
    Show,
    UserShowRating,
    Genre,
    Country,
    Franchise
)

from .filters import ShowFilter

from .serializers import (
    ShowsSearchSerializer,
    ShowSerializer,
    RateShowSerializer,
    GenreSerializer,
    CountrySerializer,
    FranchiseSerializer,
    DeleteShowRateSerializer
)


class ShowSearch(generics.ListAPIView):
    serializer_class = ShowsSearchSerializer
    filterset_class = ShowFilter

    def get_queryset(self):
        shows = (
            Show
            .objects
            .with_show_details_by_user(self.request.user)
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
        return shows


class ShowDetails(APIView):
    def get(self, request, *args, **kwargs):
        queryset = (
            Show
            .objects
            .with_show_details_by_user(self.request.user)
            .prefetch_related(
                'countries',
                'genres',
                'show_people',
                'show_people__person',
            )
        )
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


class RateShow(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return RateShowSerializer
        if self.request.method == 'DELETE':
            return DeleteShowRateSerializer
        return RateShowSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer_class()(data=request.data)
        serializer.is_valid(raise_exception=True)
        UserShowRating.objects.create(
            user=self.request.user,
            **serializer.validated_data
        )
        response = {'data': 'Your rate was recorded.'}
        return Response(data=response, status=status.HTTP_201_CREATED)

    def delete(self, request, *args, **kwargs):
        serializer = self.get_serializer_class()(data=request.data)
        serializer.is_valid(raise_exception=True)
        deleted, _ = UserShowRating.objects.filter(
            user=self.request.user,
            **serializer.validated_data
        ).delete()

        if deleted:
            response = {'data': 'Your rate was deleted.'}
        else:
            response = {'data': "Your didn't rate this show."}
        return Response(data=response, status=status.HTTP_204_NO_CONTENT)


class ShowFilters(APIView):
    def get(self, request, *args, **kwargs):
        genres = Genre.objects.all()
        countries = Country.objects.all()
        response = {
            'genres': GenreSerializer(genres, many=True).data,
            'countries': CountrySerializer(countries, many=True).data
        }
        return Response(data=response, status=status.HTTP_200_OK)
