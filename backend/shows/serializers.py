from rest_framework import serializers

from .models import (
    Person,
    ShowPerson,
    Genre,
    UserShowRating,
    FranchiseShow,
    Franchise
)
from .models.show import Show


class ShowsSearchSerializer(serializers.ModelSerializer):
    my_list = serializers.IntegerField(allow_null=True)
    my_rate = serializers.IntegerField(allow_null=True)

    class Meta:
        model = Show
        fields = (
            'english_name',
            'slug',
            'poster',
            'category',
            'rating',
            'premiere_date',
            'finale_date',
            'my_list',
            'my_rate',
        )


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = (
            'id',
            'name'
        )


class ShowPersonSerializer(serializers.ModelSerializer):
    person = PersonSerializer()

    class Meta:
        model = ShowPerson
        fields = (
            'person',
            'person_type',
        )


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = (
            'id',
            'name',
            'category'
        )


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = (
            'id',
            'name'
        )


class ShowNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Show
        fields = (
            'english_name',
        )


class FranchiseShowSerializer(serializers.ModelSerializer):
    show = ShowNameSerializer()

    class Meta:
        model = FranchiseShow
        fields = (
            'show',
            'watch_order'
        )


class FranchiseSerializer(serializers.ModelSerializer):
    shows = FranchiseShowSerializer(source='has_show', many=True)

    class Meta:
        model = Franchise
        fields = (
            'name',
            'shows'
        )


class ShowSerializer(serializers.ModelSerializer):
    people = ShowPersonSerializer(
        source='show_people',
        many=True
    )
    genres = GenreSerializer(many=True)
    countries = CountrySerializer(many=True)
    my_list = serializers.IntegerField(allow_null=True)
    my_rate = serializers.IntegerField(allow_null=True)
    in_lists = serializers.IntegerField()

    class Meta:
        model = Show
        fields = (
            'id',
            'category',
            'english_name',
            'slug',
            'alt_names',
            'poster',
            'age_rating',
            'premiere_date',
            'finale_date',
            'slogan',
            'duration_minutes',
            'episodes',
            'description',
            'countries',
            'genres',
            'rating',
            'times_rated',
            'countries',
            'people',
            'my_list',
            'my_rate',
            'in_lists'
        )


class RateShowSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserShowRating
        fields = (
            'show',
            'rating'
        )



