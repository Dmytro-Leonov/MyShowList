# Generated by Django 4.1.4 on 2022-12-14 20:37

from django.conf import settings
import django.contrib.postgres.fields
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Country',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Franchise',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50, unique=True)),
                ('genre_category', models.CharField(choices=[('movie', 'Movie'), ('tv_show', 'TV Show'), ('cartoon', 'Cartoon'), ('anime', 'Anime')], max_length=7)),
            ],
        ),
        migrations.CreateModel(
            name='Person',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Show',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('show_category', models.CharField(choices=[('movie', 'Movie'), ('tv_show', 'TV Show'), ('cartoon', 'Cartoon'), ('anime', 'Anime')], db_index=True, max_length=7)),
                ('english_name', models.CharField(db_index=True, max_length=300, unique=True)),
                ('slug', models.SlugField(max_length=300, unique=True)),
                ('alt_names', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=300, unique=True), db_index=True, size=5)),
                ('poster', models.ImageField(upload_to='posters/%Y/%m/%d/')),
                ('age_rating', models.CharField(choices=[('E', '0+'), ('Y', '10+'), ('T', '13+'), ('OT', '16+'), ('M', '18+')], db_index=True, max_length=2)),
                ('premiere_date', models.DateField(db_index=True)),
                ('slogan', models.CharField(max_length=300)),
                ('duration_minutes', models.PositiveSmallIntegerField(verbose_name='duration in minutes')),
                ('episodes', models.PositiveSmallIntegerField()),
                ('description', models.TextField(max_length=3000)),
                ('times_rated', models.PositiveIntegerField(default=0)),
                ('ratings_sum', models.PositiveIntegerField(default=0)),
                ('rating', models.PositiveIntegerField(default=0)),
                ('countries', models.ManyToManyField(related_name='shows', to='shows.country')),
                ('genres', models.ManyToManyField(related_name='shows', to='shows.genre')),
            ],
        ),
        migrations.CreateModel(
            name='UserShowRating',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('rating', models.PositiveSmallIntegerField(validators=[django.core.validators.MinValueValidator(1, "Rating can't be below 1."), django.core.validators.MaxValueValidator(10, "Rating can't be below 10.")])),
                ('show', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_ratings', to='shows.show')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ShowPerson',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('person_type', models.CharField(choices=[('producer', 'Producer'), ('actor', 'Actor')], max_length=8)),
                ('person', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shows.person')),
                ('show', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shows.show')),
            ],
            options={
                'unique_together': {('show', 'person', 'person_type')},
            },
        ),
        migrations.AddField(
            model_name='show',
            name='people',
            field=models.ManyToManyField(related_name='shows', through='shows.ShowPerson', to='shows.person'),
        ),
        migrations.CreateModel(
            name='FranchiseShow',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('watch_order', models.PositiveSmallIntegerField()),
                ('franchise', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shows.franchise')),
                ('show', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='shows.show')),
            ],
            options={
                'unique_together': {('franchise', 'watch_order')},
            },
        ),
        migrations.AddField(
            model_name='franchise',
            name='shows',
            field=models.ManyToManyField(related_name='franchise', through='shows.FranchiseShow', to='shows.show'),
        ),
    ]
