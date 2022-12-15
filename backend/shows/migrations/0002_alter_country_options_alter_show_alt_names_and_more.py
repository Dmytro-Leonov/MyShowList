# Generated by Django 4.1.4 on 2022-12-14 20:59

from django.db import migrations, models
import django_jsonform.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('shows', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='country',
            options={'verbose_name_plural': 'countries'},
        ),
        migrations.AlterField(
            model_name='show',
            name='alt_names',
            field=django_jsonform.models.fields.ArrayField(base_field=models.CharField(max_length=300, unique=True), blank=True, db_index=True, size=5),
        ),
        migrations.AlterField(
            model_name='show',
            name='episodes',
            field=models.PositiveSmallIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='show',
            name='slogan',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]