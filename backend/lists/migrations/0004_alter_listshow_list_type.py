# Generated by Django 4.1.4 on 2022-12-15 21:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lists', '0003_listshow_date_added'),
    ]

    operations = [
        migrations.AlterField(
            model_name='listshow',
            name='list_type',
            field=models.CharField(choices=[('CW', 'Watching'), ('PW', 'Plan to Watch'), ('FN', 'Finished'), ('DR', 'Dropped')], db_index=True, max_length=2),
        ),
    ]
