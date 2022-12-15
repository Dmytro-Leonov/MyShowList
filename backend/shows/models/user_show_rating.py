from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
import pgtrigger


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
            MaxValueValidator(10, "Rating can't be above 10.")
        ],
        blank=False,
        null=False
    )

    class Meta:
        db_table = 'user_show_rating'
        triggers = [
            pgtrigger.Trigger(
                name="update_show_rating_on_rate_insert",
                operation=pgtrigger.Insert,
                when=pgtrigger.Before,
                func=
                """
                DELETE FROM 
                    user_show_rating
                WHERE
                    show_id = NEW.show_id and user_id = NEW.user_id;
                
                UPDATE show
                SET
                    times_rated = times_rated + 1,
                    ratings_sum = ratings_sum + NEW.rating,
                    rating = (ratings_sum + NEW.rating) / (times_rated + 1)
                WHERE
                    id = NEW.show_id;
                RETURN NEW;
                """,
            ),
            pgtrigger.Trigger(
                name="update_show_rating_on_rate_delete",
                operation=pgtrigger.Delete,
                when=pgtrigger.After,
                func=
                """
                UPDATE show
                SET
                    times_rated = times_rated - 1,
                    ratings_sum = ratings_sum - OLD.rating,
                    rating = (ratings_sum - OLD.rating) / GREATEST(times_rated - 1, 1)
                WHERE
                    id = OLD.show_id;
                RETURN OLD;
                """,
            ),
            pgtrigger.Trigger(
                name="update_show_rating_on_rate_edit",
                operation=pgtrigger.Update,
                when=pgtrigger.After,
                func=
                """
                UPDATE show
                SET
                    ratings_sum = ratings_sum - OLD.rating + NEW.rating,
                    rating = (ratings_sum - OLD.rating + NEW.rating) / times_rated
                WHERE
                    id = OLD.show_id;
                RETURN NEW;
                """,
            )
        ]

    def __str__(self):
        return f'{self.user.full_name} - {self.show.english_name[:40]}: {self.rating}'
