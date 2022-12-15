from django.db import models
import pgtrigger


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
        WATCHING = 'CW', 'Watching'
        PLAN_TO_WATCH = 'PW', 'Plan to Watch'
        COMPLETED = 'FN', 'Finished'
        DROPPED = 'DR', 'Dropped'

    list_type = models.CharField(
        choices=ListType.choices,
        max_length=2,
        db_index=True,
        blank=False
    )
    date_added = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'list_show'
        triggers = [
            pgtrigger.Trigger(
                name="delete_list_show_on_insert",
                operation=pgtrigger.Insert,
                when=pgtrigger.After,
                func=
                """
                DELETE FROM 
                    list_show
                WHERE
                    show_id = NEW.show_id and 
                    user_id = NEW.user_id and
                    list_type = OLD.list_type;
                return NEW;
                """,
            ),
        ]

    def __str__(self):
        return f'{self.user.full_name}: {self.show.english_name} - {self.list_type}'
