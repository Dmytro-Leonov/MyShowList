from django.db import models


class FranchiseShow(models.Model):
    id = models.AutoField(primary_key=True)
    franchise = models.ForeignKey(
        'Franchise',
        on_delete=models.CASCADE,
        blank=False,
        null=False
    )
    show = models.OneToOneField(
        'Show',
        on_delete=models.CASCADE,
        blank=False,
        null=False
    )
    watch_order = models.PositiveSmallIntegerField()

    class Meta:
        db_table = 'franchise_show'
        unique_together = [['franchise', 'watch_order']]

    def __str__(self):
        return f'{self.watch_order} - {self.franchise.name}'

