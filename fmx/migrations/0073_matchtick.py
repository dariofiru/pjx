# Generated by Django 4.2.7 on 2024-01-29 15:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fmx', '0072_goalscores'),
    ]

    operations = [
        migrations.CreateModel(
            name='MatchTick',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('interval', models.PositiveIntegerField(default=2)),
            ],
        ),
    ]
