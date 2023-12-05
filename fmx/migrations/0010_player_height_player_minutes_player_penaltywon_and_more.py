# Generated by Django 4.2.7 on 2023-12-05 07:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fmx', '0009_alter_user_club_goalkeeper_1'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='height',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='player',
            name='minutes',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='player',
            name='penaltywon',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='player',
            name='redcard',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='player',
            name='teamlogo',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='player',
            name='weight',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='player',
            name='yellowcard',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
    ]
