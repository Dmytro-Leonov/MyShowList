# Generated by Django 4.1.4 on 2022-12-21 14:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shows', '0016_remove_usershowrating_update_show_rating_on_rate_insert_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='genre',
            name='category',
            field=models.IntegerField(choices=[(1, 'Movie'), (2, 'TV Show'), (3, 'Cartoon'), (4, 'Anime')]),
        ),
    ]