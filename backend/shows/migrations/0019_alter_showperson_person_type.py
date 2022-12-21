# Generated by Django 4.1.4 on 2022-12-21 20:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shows', '0018_alter_show_rating'),
    ]

    operations = [
        migrations.AlterField(
            model_name='showperson',
            name='person_type',
            field=models.IntegerField(choices=[(1, 'Producer'), (2, 'Writer'), (3, 'Actor')]),
        ),
    ]