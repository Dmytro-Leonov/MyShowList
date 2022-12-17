# Generated by Django 4.1.4 on 2022-12-17 12:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('shows', '0010_rename_genre_category_genre_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='franchiseshow',
            name='franchise',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='has_show', to='shows.franchise'),
        ),
        migrations.AlterField(
            model_name='franchiseshow',
            name='show',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='in_franchise', to='shows.show'),
        ),
    ]
