# Generated by Django 4.2.7 on 2024-01-02 12:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fmx', '0055_tmp_lineup_score_match_tmp_lineup_score_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='tmp_lineup_score',
            name='assists',
            field=models.PositiveIntegerField(blank=True, default=0, null=True),
        ),
    ]
