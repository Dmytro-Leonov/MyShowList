from django.db import models


class CommentVote(models.Model):
    id = models.AutoField(primary_key=True)
    comment = models.ForeignKey(
        to='Comment',
        on_delete=models.CASCADE,
        related_name='comment_votes',
        blank=False,
        null=False
    )
    user = models.ForeignKey(
        to='users.User',
        on_delete=models.CASCADE,
        related_name='comment_votes',
        blank=False,
        null=False
    )

    class Vote(models.IntegerChoices):
        LIKE = 1, 'Like'
        DISLIKE = -1, 'Dislike'

    vote = models.SmallIntegerField(
        choices=Vote.choices,
        blank=False,
        null=False
    )

    class Meta:
        db_table = 'comment_vote'

    def __str__(self):
        return f'{self.user.full_name}: {"Like" if self.vote == 1 else "Dislike"}'
