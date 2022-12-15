from django.db import models
from django_jsonform.models.fields import ArrayField


class Show(models.Model):
    id = models.AutoField(primary_key=True)

    class ShowCategory(models.TextChoices):
        MOVIE = 'movie', 'Movie'
        TV_SHOW = 'tv_show', 'TV Show'
        CARTOON = 'cartoon', 'Cartoon'
        ANIME = 'anime', 'Anime'

    show_category = models.CharField(
        choices=ShowCategory.choices,
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
    slogan = models.CharField(max_length=200, blank=True)
    duration_minutes = models.PositiveSmallIntegerField(
        null=False,
        blank=False,
        verbose_name="duration in minutes"
    )
    episodes = models.PositiveSmallIntegerField(blank=True, null=True)
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

    def __str__(self):
        return self.english_name
