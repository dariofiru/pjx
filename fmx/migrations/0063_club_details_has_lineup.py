# Generated by Django 4.2.7 on 2024-01-09 16:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fmx', '0062_rename_original_value_player_current_value'),
    ]

    operations = [
        migrations.AddField(
            model_name='club_details',
            name='has_lineup',
            field=models.BooleanField(default=False),
        ),
    ]
