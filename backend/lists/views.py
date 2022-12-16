from django.db.models import (
    Subquery,
    OuterRef
)

from rest_framework import (
    generics,
    status
)
from rest_framework import permissions
from rest_framework.response import Response

from shows.models.show import Show
from shows.models.user_show_rating import UserShowRating
from .models import ListShow

from .serializers import (
    UserListShowsSerializer,
    AddToListSerializer,
    GetUserListShowsSerializer
)


class GetUserListShows(generics.ListAPIView):
    serializer_class = GetUserListShowsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        shows = (
            Show
            .objects
            .annotate(
                my_rate=Subquery(
                    UserShowRating.objects.filter(
                        user=self.request.user,
                        show=OuterRef('id')
                    )
                    .values('rating'),
                )
            )
            .only(
                'id',
                'english_name',
                'slug',
                'poster',
                'category',
                'rating',
            )
        )
        return shows

    def get(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        list_shows = self.get_queryset().filter(
            user_lists__user=self.request.user,
            user_lists__list_type=serializer.validated_data.get('list_type')
        )
        response = UserListShowsSerializer(list_shows, many=True).data
        return Response(data=response, status=status.HTTP_200_OK)


class AddToList(generics.CreateAPIView):
    serializer_class = AddToListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        list_show = ListShow.objects.create(
            user=self.request.user,
            **serializer.validated_data
        )
        response = self.serializer_class(list_show).data
        return Response(data=response, status=status.HTTP_201_CREATED)

