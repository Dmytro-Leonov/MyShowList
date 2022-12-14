from django.db import models
from django.core.validators import MinLengthValidator
from django.db.models import Count, Subquery, OuterRef, IntegerField, Exists


class CommentManager(models.Manager):
    @staticmethod
    def _get_user_vote_subquery(user):
        from comments.models import CommentVote
        subquery = (
            Subquery(
                CommentVote.objects.filter(
                    user=user,
                    comment_id=OuterRef('id')
                )
                .values('vote'),
                output_field=IntegerField(null=True)
            )
        )
        return subquery

    def detailed_info_with_replies_count(self, *, show_id: int = None, parent_comment_id: int = None, user=None):
        # validate inputs
        if not show_id and not parent_comment_id or show_id and parent_comment_id:
            raise TypeError('Ether show_id or parent_comment_id should be passed.')

        # create annotations based on input
        annotation = {}
        # if not parent_comment_id:
        annotation.update(
            {'replies_count': Count('child_comments')}
        )
        if user and user.is_authenticated:
            annotation.update(
                user_vote=self._get_user_vote_subquery(user)
            )

        # create filters based on input
        filters = {}
        if show_id:
            filters.update(show_id=show_id, parent_comment__isnull=True)
        if parent_comment_id:
            filters.update(parent_comment=parent_comment_id)

        # compose query
        comments = (
            self
            .annotate(**annotation)
            .filter(**filters)
            .select_related(
                'user',
                'reply_to_user'
            )
            .only(
                'parent_comment',
                'user__id',
                'user__full_name',
                'user__picture',
                'reply_to_user__full_name',
                'date_created',
                'text',
                'likes',
            )
        )
        return comments


class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    show = models.ForeignKey(
        to='shows.Show',
        on_delete=models.CASCADE,
        related_name='comments',
        blank=True,
        null=True
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
        blank=True,
        null=True
    )
    reply_to_user = models.ForeignKey(
        to='users.User',
        on_delete=models.SET_NULL,
        blank=True,
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
        ],
        blank=False
    )
    likes = models.IntegerField(default=0)

    objects = CommentManager()

    class Meta:
        db_table = 'comment'

    def __str__(self):
        return f'{self.user.full_name}: {self.text[:40]}'
