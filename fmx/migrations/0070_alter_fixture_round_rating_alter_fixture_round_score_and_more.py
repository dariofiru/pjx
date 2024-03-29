# Generated by Django 4.2.7 on 2024-01-21 21:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fmx', '0069_alter_club_details_initial_budget_alter_lineup_score'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fixture_round',
            name='rating',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True),
        ),
        migrations.AlterField(
            model_name='fixture_round',
            name='score',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True),
        ),
        migrations.AlterField(
            model_name='one2one',
            name='score_1',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True),
        ),
        migrations.AlterField(
            model_name='one2one',
            name='score_2',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True),
        ),
        migrations.AlterField(
            model_name='table',
            name='score_1',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True),
        ),
        migrations.AlterField(
            model_name='table',
            name='score_2',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True),
        ),
    ]
