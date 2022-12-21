from django.db import models
from .show import Show


class Genre(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, unique=True)

    category = models.IntegerField(
        choices=Show.Category.choices,
        blank=False
    )

    class Meta:
        db_table = 'genre'

    def __str__(self):
        return f'{self.category}: {self.name}'
