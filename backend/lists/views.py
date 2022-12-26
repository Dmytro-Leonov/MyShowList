from django.db.models import Count

from rest_framework import (
    generics,
    status
)
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from shows.models.show import Show
from .models import ListShow

from .serializers import (
    UserListShowsSerializer,
    AddToListSerializer,
    GetUserListShowsSerializer,
    DeleteFromListSerializer,
    ListsShowCountSerializer
)


class GetUserListShows(generics.ListAPIView):
    serializer_class = GetUserListShowsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        shows = (
            Show
            .objects
            .annotate(
                my_rate=Show.objects.get_user_rating_for_show_subquery(
                    self.request.user
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

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        list_shows = self.get_queryset().filter(
            user_lists__user=self.request.user,
            user_lists__list_type=serializer.validated_data.get('list_type')
        )
        response = UserListShowsSerializer(list_shows, many=True, context={'request': request}).data
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


class DeleteFromList(generics.DestroyAPIView):
    serializer_class = DeleteFromListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        ListShow.objects.filter(
            user=self.request.user,
            **serializer.validated_data
        ).delete()
        response = {'data': 'Show was successfully deleted from your list.'}
        return Response(data=response, status=status.HTTP_204_NO_CONTENT)


class ListsShowCount(APIView):
    serializer_class = ListsShowCountSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        lists_show_count = (
            ListShow
            .objects
            .filter(user=self.request.user)
            .annotate(show_count=Count('list_type'))
            .only('list_type')
        )
        response = self.serializer_class(lists_show_count, many=True).data
        return Response(data=response, status=status.HTTP_200_OK)
