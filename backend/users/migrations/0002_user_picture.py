# Generated by Django 4.1.4 on 2022-12-14 04:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='picture',
            field=models.ImageField(default='', upload_to='profile_pictures/%Y/%m/%d/'),
            preserve_default=False,
        ),
    ]
