# Generated by Django 4.2.7 on 2023-12-05 08:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fmx', '0010_player_height_player_minutes_player_penaltywon_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='player',
            name='height',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='player',
            name='weight',
            field=models.TextField(null=True),
        ),
    ]
