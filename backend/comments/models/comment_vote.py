from django.db import models
import pgtrigger


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
        triggers = [
            pgtrigger.Trigger(
                name="update_comment_likes_on_new_vote",
                operation=pgtrigger.Insert,
                when=pgtrigger.Before,
                func=
                """
                DELETE FROM 
                    comment_vote
                WHERE
                    comment_id = NEW.comment_id and user_id = NEW.user_id;

                UPDATE comment
                SET
                    likes = likes + NEW.vote
                WHERE
                    id = NEW.comment_id;
                RETURN NEW;
                """,
            ),
            pgtrigger.Trigger(
                name="update_comment_likes_on_vote_delete",
                operation=pgtrigger.Delete,
                when=pgtrigger.After,
                func=
                """
                UPDATE comment
                SET
                    likes = likes - OLD.vote
                WHERE
                    id = OLD.comment_id;
                RETURN OLD;
                """,
            ),
            pgtrigger.Trigger(
                name="update_comment_likes_on_vote_edit",
                operation=pgtrigger.Update,
                when=pgtrigger.After,
                func=
                """
                UPDATE comment
                SET
                    likes = likes - OLD.vote + NEW.vote
                WHERE
                    id = OLD.comment_id;
                RETURN NEW;
                """,
            )
        ]

    def __str__(self):
        return f'{self.user.full_name}: {"Like" if self.vote == 1 else "Dislike"}'
