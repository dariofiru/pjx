# Generated by Django 4.2.7 on 2024-01-05 21:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fmx', '0059_starter'),
    ]

    operations = [
        migrations.AddField(
            model_name='starter',
            name='round_num',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
    ]