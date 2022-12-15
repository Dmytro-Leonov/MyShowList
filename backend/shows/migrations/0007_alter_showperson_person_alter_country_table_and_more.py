# Generated by Django 4.1.4 on 2022-12-15 16:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('shows', '0006_alter_showperson_show'),
    ]

    operations = [
        migrations.AlterField(
            model_name='showperson',
            name='person',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='person_shows', to='shows.person'),
        ),
        migrations.AlterModelTable(
            name='country',
            table='country',
        ),
        migrations.AlterModelTable(
            name='franchise',
            table='franchise',
        ),
        migrations.AlterModelTable(
            name='franchiseshow',
            table='franchise_show',
        ),
        migrations.AlterModelTable(
            name='genre',
            table='genre',
        ),
        migrations.AlterModelTable(
            name='person',
            table='person',
        ),
        migrations.AlterModelTable(
            name='show',
            table='show',
        ),
        migrations.AlterModelTable(
            name='showperson',
            table='show_person',
        ),
        migrations.AlterModelTable(
            name='usershowrating',
            table='user_show_rating',
        ),
    ]