from django_filters import rest_framework as filters
from django.db.models import Q
from .models import (
    Show,
    Genre
)


class ShowFilter(filters.FilterSet):
    name = filters.CharFilter(
        method='filter_by_all_names'
    )
    year_gte = filters.NumberFilter(
        field_name='premiere_date',
        lookup_expr='year__gte'
    )
    year_lte = filters.NumberFilter(
        field_name='premiere_date',
        lookup_expr='year__lte'
    )
    category = filters.MultipleChoiceFilter(
        choices=Show.Category.choices
    )
    age = filters.MultipleChoiceFilter(
        field_name="age_rating",
        choices=Show.AgeRating.choices
    )
    genre_broad = filters.ModelMultipleChoiceFilter(
        field_name='genres__id',
        to_field_name='id',
        queryset=Genre.objects.all(),
        conjoined=False
    )
    genre_exact = filters.ModelMultipleChoiceFilter(
        field_name='genres__id',
        to_field_name='id',
        queryset=Genre.objects.all(),
        conjoined=True
    )
    genre_exclude = filters.ModelMultipleChoiceFilter(
        field_name='genres__id',
        to_field_name='id',
        queryset=Genre.objects.all(),
        exclude=True
    )

    order = filters.OrderingFilter(
        fields=(
            ('rating', 'rating'),
            ('english_name', 'name'),
            ('date_added', 'date_added'),
            ('premiere_date', 'premiere_date'),
        ),
    )

    def filter_by_all_names(self, queryset, name, value):
        return queryset.filter(
            Q(english_name__icontains=value) | Q(alt_names__icontains=value)
        )

    class Meta:
        model = Show
        fields = (
            'name',
            'year_gte',
            'year_lte',
            'category',
            'age',
            'genre_broad',
            'genre_exact',
            'genre_exclude'
        )
