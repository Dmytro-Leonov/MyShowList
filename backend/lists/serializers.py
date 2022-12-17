from rest_framework import serializers

from lists.models import ListShow
from shows.models import Show


class GetUserListShowsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListShow
        fields = ('list_type',)


class UserListShowsSerializer(serializers.ModelSerializer):
    my_rate = serializers.IntegerField(allow_null=True)

    class Meta:
        model = Show
        fields = (
            'id',
            'english_name',
            'slug',
            'poster',
            'category',
            'rating',
            'my_rate'
        )


class AddToListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListShow
        fields = (
            'show',
            'list_type',
        )


class DeleteFromListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListShow
        fields = ('show',)


class ListsShowCountSerializer(serializers.ModelSerializer):
    show_count = serializers.IntegerField()

    class Meta:
        model = ListShow
        fields = (
            'list_type',
            'show_count'
        )
