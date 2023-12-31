# Generated by Django 4.2.7 on 2023-12-27 22:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('fmx', '0043_delete_notificationtype_headline_type'),
    ]

    operations = [
        migrations.CreateModel(
            name='One2one',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('score_1', models.DecimalField(blank=True, decimal_places=1, max_digits=5, null=True)),
                ('score_2', models.DecimalField(blank=True, decimal_places=1, max_digits=5, null=True)),
                ('round_num', models.PositiveIntegerField()),
                ('bet', models.DecimalField(blank=True, decimal_places=1, max_digits=5, null=True)),
                ('lineup_1', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lineup_table11', to='fmx.lineup')),
                ('lineup_2', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lineup_table21', to='fmx.lineup')),
                ('squad_1', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='User_club11', to='fmx.user_club')),
                ('squad_2', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='User_club21', to='fmx.user_club')),
            ],
        ),
    ]
