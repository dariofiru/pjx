# Generated by Django 4.2.7 on 2023-12-16 21:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fmx', '0028_round'),
    ]

    operations = [
        migrations.AddField(
            model_name='lineup',
            name='active',
            field=models.BooleanField(default=True),
        ),
    ]