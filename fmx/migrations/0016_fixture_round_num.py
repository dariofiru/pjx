# Generated by Django 4.2.7 on 2023-12-12 20:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fmx', '0015_lineup'),
    ]

    operations = [
        migrations.AddField(
            model_name='fixture',
            name='round_num',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
    ]
