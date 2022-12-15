from django.db import models
from .show import Show


class Genre(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, unique=True)

    genre_category = models.CharField(
        choices=Show.ShowCategory.choices,
        max_length=7,
        blank=False
    )

    def __str__(self):
        return f'{self.genre_category}: {self.name}'
