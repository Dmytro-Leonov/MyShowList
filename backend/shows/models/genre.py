from django.db import models
from .show import Show


class Genre(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)

    category = models.IntegerField(
        choices=Show.Category.choices,
        blank=False
    )

    def get_category(self) -> Show.Category:
        return Show.Category(self.category).label

    class Meta:
        db_table = 'genre'
        unique_together = ['name', 'category']

    def __str__(self):
        return f'{self.get_category()}: {self.name}'
