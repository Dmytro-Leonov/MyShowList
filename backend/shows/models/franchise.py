from django.db import models


class Franchise(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, unique=True)
    shows = models.ManyToManyField(
        to='Show',
        through='FranchiseShow',
        related_name='franchise'
    )

    class Meta:
        db_table = 'franchise'

    def __str__(self):
        return f'{self.name}'
