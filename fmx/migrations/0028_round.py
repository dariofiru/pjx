# Generated by Django 4.2.7 on 2023-12-16 20:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fmx', '0027_alter_club_details_initial_budget_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Round',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('round_num', models.PositiveIntegerField()),
                ('next', models.BooleanField(default=False)),
            ],
        ),
    ]