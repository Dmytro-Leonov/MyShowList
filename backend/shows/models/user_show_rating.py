from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class UserShowRating(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(
        'users.User',
        on_delete=models.CASCADE,
        blank=False,
        null=False
    )
    show = models.ForeignKey(
        'Show',
        on_delete=models.CASCADE,
        related_name='user_ratings',
        blank=False,
        null=False
    )
    rating = models.PositiveSmallIntegerField(
        validators=[
            MinValueValidator(1, "Rating can't be below 1."),
            MaxValueValidator(10, "Rating can't be below 10.")
        ],
        blank=False,
        null=False
    )

    def __str__(self):
        return f'{self.user.full_name} - {self.show.english_name[:40]}: {self.rating}'
