from django.db import models


class ShowPerson(models.Model):
    id = models.AutoField(primary_key=True)
    person = models.ForeignKey(
        'Person',
        on_delete=models.CASCADE,
        blank=False,
        null=False
    )
    show = models.ForeignKey(
        'Show',
        on_delete=models.CASCADE,
        blank=False,
        null=False
    )

    class PersonType(models.TextChoices):
        PRODUCER = 'producer', 'Producer'
        ACTOR = 'actor', 'Actor'

    person_type = models.CharField(
        choices=PersonType.choices,
        max_length=8,
        blank=False
    )

    def __str__(self):
        return f'{self.person.name}: {self.show.english_name} - {self.person_type}'

    class Meta:
        unique_together = ['show', 'person', 'person_type']
