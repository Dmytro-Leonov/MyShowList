# Generated by Django 4.1.4 on 2022-12-21 02:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shows', '0014_alter_showperson_person_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='show',
            name='rating',
            field=models.DecimalField(decimal_places=5, default=0, max_digits=7),
        ),
    ]