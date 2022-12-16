from django.db import models
from .show import Show


class Genre(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, unique=True)

    category = models.CharField(
        choices=Show.Category.choices,
        max_length=7,
        blank=False
    )

    class Meta:
        db_table = 'genre'

    def __str__(self):
        return f'{self.category}: {self.name}'
