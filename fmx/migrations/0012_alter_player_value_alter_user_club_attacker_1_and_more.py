# Generated by Django 4.2.7 on 2023-12-08 23:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('fmx', '0011_alter_player_height_alter_player_weight'),
    ]

    operations = [
        migrations.AlterField(
            model_name='player',
            name='value',
            field=models.DecimalField(blank=True, decimal_places=1, max_digits=5, null=True),
        ),
        migrations.AlterField(
            model_name='user_club',
            name='attacker_1',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='a1', to='fmx.player'),
        ),
        migrations.AlterField(
            model_name='user_club',
            name='attacker_2',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='a2', to='fmx.player'),
        ),
        migrations.AlterField(
            model_name='user_club',
            name='attacker_3',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='a3', to='fmx.player'),
        ),
        migrations.AlterField(
            model_name='user_club',
            name='attacker_4',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='a4', to='fmx.player'),
        ),
        migrations.AlterField(
            model_name='user_club',
            name='attacker_5',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='a5', to='fmx.player'),
        ),
        migrations.AlterField(
            model_name='user_club',
            name='defender_1',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='d1', to='fmx.player'),
        ),
        migrations.AlterField(
            model_name='user_club',
            name='defender_2',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='d2', to='fmx.player'),
        ),
        migrations.AlterField(
            model_name='user_club',
            name='defender_3',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='d3', to='fmx.player'),
        ),
        migrations.AlterField(
            model_name='user_club',
            name='defender_4',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='d4', to='fmx.player'),
        ),
        migrations.AlterField(
            model_name='user_club',
            name='defender_5',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='d5', to='fmx.player'),
        ),
        migrations.AlterField(
            model_name='user_club',
            name='goalkeeper_2',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='g2', to='fmx.player'),
        ),
        migrations.AlterField(
            model_name='user_club',
            name='midfielder_1',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='m1', to='fmx.player'),
        ),
        migrations.AlterField(
            model_name='user_club',
            name='midfielder_2',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='m2', to='fmx.player'),
        ),
        migrations.AlterField(
            model_name='user_club',
            name='midfielder_3',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='m3', to='fmx.player'),
        ),
        migrations.AlterField(
            model_name='user_club',
            name='midfielder_4',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='m4', to='fmx.player'),
        ),
        migrations.AlterField(
            model_name='user_club',
            name='midfielder_5',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='m5', to='fmx.player'),
        ),
    ]
