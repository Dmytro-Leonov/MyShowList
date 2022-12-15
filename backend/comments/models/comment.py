from django.db import models
from django.core.validators import MinLengthValidator


class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    show = models.ForeignKey(
        to='shows.Show',
        on_delete=models.CASCADE,
        related_name='comments',
        blank=False,
        null=False
    )
    user = models.ForeignKey(
        to='users.User',
        on_delete=models.CASCADE,
        related_name='comments',
        blank=False,
        null=False
    )
    parent_comment = models.ForeignKey(
        to='Comment',
        on_delete=models.CASCADE,
        related_name='child_comments',
        blank=False,
        null=False
    )
    reply_to_user = models.ForeignKey(
        to='users.User',
        on_delete=models.SET_NULL,
        related_name='child_comments',
        blank=False,
        null=True
    )
    date_created = models.DateTimeField(
        auto_now_add=True,
        blank=False,
        null=False
    )
    text = models.TextField(
        max_length=2000,
        validators=[
            MinLengthValidator(5, 'Comment should be at least 5 characters long')
        ]
    )
    likes = models.IntegerField(default=0)

    class Meta:
        db_table = 'comment'

    def __str__(self):
        return f'{self.user.full_name} - {self.show.english_name}: {self.text[:40]}'

