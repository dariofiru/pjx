# Generated by Django 4.2.7 on 2024-01-17 14:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fmx', '0066_table_round_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='user_club',
            name='attacker_1_price',
            field=models.DecimalField(decimal_places=1, default=0.0, max_digits=5),
        ),
        migrations.AddField(
            model_name='user_club',
            name='attacker_2_price',
            field=models.DecimalField(decimal_places=1, default=0.0, max_digits=5),
        ),
        migrations.AddField(
            model_name='user_club',
            name='attacker_3_price',
            field=models.DecimalField(decimal_places=1, default=0.0, max_digits=5),
        ),
        migrations.AddField(
            model_name='user_club',
            name='attacker_4_price',
            field=models.DecimalField(decimal_places=1, default=0.0, max_digits=5),
        ),
        migrations.AddField(
            model_name='user_club',
            name='defender_1_price',
            field=models.DecimalField(decimal_places=1, default=0.0, max_digits=5),
        ),
        migrations.AddField(
            model_name='user_club',
            name='defender_2_price',
            field=models.DecimalField(decimal_places=1, default=0.0, max_digits=5),
        ),
        migrations.AddField(
            model_name='user_club',
            name='defender_3_price',
            field=models.DecimalField(decimal_places=1, default=0.0, max_digits=5),
        ),
        migrations.AddField(
            model_name='user_club',
            name='defender_4_price',
            field=models.DecimalField(decimal_places=1, default=0.0, max_digits=5),
        ),
        migrations.AddField(
            model_name='user_club',
            name='defender_5_price',
            field=models.DecimalField(decimal_places=1, default=0.0, max_digits=5),
        ),
        migrations.AddField(
            model_name='user_club',
            name='goalkeeper_1_price',
            field=models.DecimalField(decimal_places=1, default=0.0, max_digits=5),
        ),
        migrations.AddField(
            model_name='user_club',
            name='goalkeeper_2_price',
            field=models.DecimalField(decimal_places=1, default=0.0, max_digits=5),
        ),
        migrations.AddField(
            model_name='user_club',
            name='midfielder_1_price',
            field=models.DecimalField(decimal_places=1, default=0.0, max_digits=5),
        ),
        migrations.AddField(
            model_name='user_club',
            name='midfielder_2_price',
            field=models.DecimalField(decimal_places=1, default=0.0, max_digits=5),
        ),
        migrations.AddField(
            model_name='user_club',
            name='midfielder_3_price',
            field=models.DecimalField(decimal_places=1, default=0.0, max_digits=5),
        ),
        migrations.AddField(
            model_name='user_club',
            name='midfielder_4_price',
            field=models.DecimalField(decimal_places=1, default=0.0, max_digits=5),
        ),
        migrations.AddField(
            model_name='user_club',
            name='midfielder_5_price',
            field=models.DecimalField(decimal_places=1, default=0.0, max_digits=5),
        ),
    ]
