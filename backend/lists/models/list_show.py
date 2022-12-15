from django.db import models


class ListShow(models.Model):
    id = models.AutoField(primary_key=True)
    show = models.ForeignKey(
        to='shows.Show',
        on_delete=models.CASCADE,
        related_name='user_lists',
        blank=False,
        null=False
    )
    user = models.ForeignKey(
        to='users.User',
        on_delete=models.CASCADE,
        related_name='shows_in_lists',
        blank=False,
        null=False
    )

    class ListType(models.TextChoices):
        WATCHING = 'watching', 'Watching'
        PLAN_TO_WATCH = 'plan_to_watch', 'Plan to Watch'
        COMPLETED = 'completed', 'Completed'
        DROPPED = 'dropped', 'Dropped'

    list_type = models.CharField(
        choices=ListType.choices,
        max_length=13,
        db_index=True,
        blank=False
    )

    def __str__(self):
        return f'{self.user.full_name}: {self.show.english_name} - {self.list_type}'
