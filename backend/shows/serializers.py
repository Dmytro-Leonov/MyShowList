from rest_framework import serializers

from .models import Person, ShowPerson, Genre
from .models.show import Show


class ShowsSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Show
        fields = (
            'english_name',
            'slug',
            'poster',
            'category',
            'rating',
            'premiere_date',
            'finale_date'
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
            'name'
        )


class CountriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = (
            'id',
            'name'
        )


class ShowSerializer(serializers.ModelSerializer):
    people = ShowPersonSerializer(
        source='show_people',
        many=True
    )
    genres = GenreSerializer(many=True)
    countries = CountriesSerializer(many=True)
    my_list = serializers.CharField(allow_null=True)
    my_rate = serializers.IntegerField(allow_null=True)

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
            'my_rate'
        )