from django.core.exceptions import ValidationError
from django.db import models
from django.db.models import Subquery, OuterRef, Count
from django_jsonform.models.fields import ArrayField

from lists.models import ListShow


class ShowManager(models.Manager):
    def with_show_details_by_user(self, user):
        from shows.models import UserShowRating
        annotation = {
            'in_lists': Count('user_lists'),
        }
        if user.is_authenticated:
            annotation = {
                **annotation,
                'my_list':
                    Subquery(
                        ListShow.objects.filter(
                            user=user,
                            show=OuterRef('id')
                        )
                        .values('list_type'),
                    ),
                'my_rate':
                    Subquery(
                        UserShowRating.objects.filter(
                            user=user,
                            show=OuterRef('id')
                        )
                        .values('rating'),
                    )
            }

        queryset = (
            self
            .prefetch_related(
                'countries',
                'genres',
                'show_people',
                'show_people__person',
            )
            .annotate(**annotation)
        )
        return queryset



class Show(models.Model):
    id = models.AutoField(primary_key=True)

    class Category(models.TextChoices):
        MOVIE = 'movie', 'Movie'
        TV_SHOW = 'tv_show', 'TV Show'
        CARTOON = 'cartoon', 'Cartoon'
        ANIME = 'anime', 'Anime'

    category = models.CharField(
        choices=Category.choices,
        max_length=7,
        db_index=True,
        blank=False
    )

    english_name = models.CharField(
        max_length=300,
        db_index=True,
        unique=True,
        blank=False
    )
    slug = models.SlugField(
        max_length=300,
        db_index=True,
        unique=True
    )
    alt_names = ArrayField(
        base_field=models.CharField(max_length=300, unique=True),
        size=5,
        blank=True,
        db_index=True
    )

    poster = models.ImageField(upload_to='posters/%Y/%m/%d/')
    
    class AgeRating(models.TextChoices):
        EVERYONE = 'E', '0+'
        YOUTH = 'Y', '10+'
        TEENS = 'T', '13+'
        OLDER_TEENS = 'OT', '16+'
        MATURE = 'M', '18+'

    age_rating = models.CharField(
        choices=AgeRating.choices,
        max_length=2,
        db_index=True,
        blank=False
    )

    premiere_date = models.DateField(db_index=True)
    finale_date = models.DateField(
        blank=True,
        null=True,
    )
    slogan = models.CharField(max_length=200, blank=True)
    duration_minutes = models.PositiveSmallIntegerField(
        null=False,
        blank=False,
        verbose_name="duration in minutes"
    )
    episodes = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(max_length=3000)
    times_rated = models.PositiveIntegerField(default=0)
    ratings_sum = models.PositiveIntegerField(default=0)
    rating = models.PositiveIntegerField(default=0)
    date_added = models.DateTimeField(auto_now_add=True)

    people = models.ManyToManyField(
        to='Person',
        through='ShowPerson',
        related_name='shows'
    )
    countries = models.ManyToManyField(
        to='Country',
        related_name='shows'
    )
    genres = models.ManyToManyField(
        to='Genre',
        related_name='shows'
    )

    objects = ShowManager()

    def _validate_premiere_finale_dates(self):
        if self.premiere_date > self.finale_date:
            raise ValidationError("Finale date cannot be before premiere date date.")

    def save(self, *args, **kwargs):
        self._validate_premiere_finale_dates()
        return super().save(*args, **kwargs)

    class Meta:
        db_table = 'show'

    def __str__(self):
        return self.english_name
