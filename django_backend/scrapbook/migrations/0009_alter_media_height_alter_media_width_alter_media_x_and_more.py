# Generated by Django 5.1.1 on 2025-06-10 22:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('scrapbook', '0008_media_height_media_width_media_x_media_y'),
    ]

    operations = [
        migrations.AlterField(
            model_name='media',
            name='height',
            field=models.IntegerField(default=50),
        ),
        migrations.AlterField(
            model_name='media',
            name='width',
            field=models.IntegerField(default=50),
        ),
        migrations.AlterField(
            model_name='media',
            name='x',
            field=models.IntegerField(default=100),
        ),
        migrations.AlterField(
            model_name='media',
            name='y',
            field=models.IntegerField(default=100),
        ),
    ]
