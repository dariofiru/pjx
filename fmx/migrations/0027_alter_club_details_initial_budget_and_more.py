# Generated by Django 4.2.7 on 2023-12-16 20:40

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('fmx', '0026_lineup_score'),
    ]

    operations = [
        migrations.AlterField(
            model_name='club_details',
            name='initial_budget',
            field=models.FloatField(default=760),
        ),
        migrations.AlterField(
            model_name='user_club',
            name='initial_budget',
            field=models.FloatField(default=760),
        ),
        migrations.CreateModel(
            name='Lineup_round',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('round_num', models.PositiveIntegerField(blank=True, null=True)),
                ('lineup', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lineup', to='fmx.lineup')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='users_lineup_round', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]