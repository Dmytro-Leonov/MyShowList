from django.db import models
from django.db.models import Prefetch


class FranchiseManager(models.Manager):
    def franchise_shows_by_show_id(self, show_id: int):
        from shows.models import Show
        franchise = (
            self
            .prefetch_related(
                Prefetch(
                    'has_show__show',
                    queryset=Show.objects.all().only('english_name'))
            )
            .filter(has_show__show_id=show_id)
            .first()
        )
        return franchise


class Franchise(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, unique=True)
    shows = models.ManyToManyField(
        to='Show',
        through='FranchiseShow',
        related_name='franchise'
    )

    objects = FranchiseManager()

    class Meta:
        db_table = 'franchise'

    def __str__(self):
        return f'{self.name}'
