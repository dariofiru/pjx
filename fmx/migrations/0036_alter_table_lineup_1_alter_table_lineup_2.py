# Generated by Django 4.2.7 on 2023-12-18 09:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('fmx', '0035_alter_club_details_elo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='table',
            name='lineup_1',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lineup_table1', to='fmx.lineup'),
        ),
        migrations.AlterField(
            model_name='table',
            name='lineup_2',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lineup_table2', to='fmx.lineup'),
        ),
    ]