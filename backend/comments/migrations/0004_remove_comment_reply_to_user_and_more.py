# Generated by Django 4.1.4 on 2022-12-17 14:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0003_alter_comment_parent_comment_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='reply_to_user',
        ),
        migrations.AddField(
            model_name='comment',
            name='reply_to_comment',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='comments.comment'),
        ),
    ]