# Generated by Django 4.1.4 on 2022-12-20 22:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shows', '0011_alter_franchiseshow_franchise_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='genre',
            name='category',
            field=models.CharField(choices=[(1, 'Movie'), (2, 'TV Show'), (3, 'Cartoon'), (4, 'Anime')], max_length=7),
        ),
        migrations.AlterField(
            model_name='show',
            name='age_rating',
            field=models.IntegerField(choices=[(1, '0+'), (2, '10+'), (3, '13+'), (4, '16+'), (5, '18+')]),
        ),
        migrations.AlterField(
            model_name='show',
            name='category',
            field=models.IntegerField(choices=[(1, 'Movie'), (2, 'TV Show'), (3, 'Cartoon'), (4, 'Anime')]),
        ),
    ]
