# Generated by Django 4.2.7 on 2023-12-16 22:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fmx', '0031_alter_table_lineup_1_alter_table_lineup_2'),
    ]

    operations = [
        migrations.AddField(
            model_name='table',
            name='score_1',
            field=models.DecimalField(blank=True, decimal_places=1, max_digits=5, null=True),
        ),
        migrations.AddField(
            model_name='table',
            name='score_2',
            field=models.DecimalField(blank=True, decimal_places=1, max_digits=5, null=True),
        ),
    ]
