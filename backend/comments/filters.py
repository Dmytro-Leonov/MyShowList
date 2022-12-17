from django_filters import rest_framework as filters


class CommentFilter(filters.FilterSet):

    order = filters.OrderingFilter(
        fields=(
            ('likes', 'likes'),
            ('date_created', 'date')
        ),
    )
