# Generated by Django 5.1.1 on 2025-06-02 04:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('scrapbook', '0005_media_albumid'),
    ]

    operations = [
        migrations.RenameField(
            model_name='media',
            old_name='albumID',
            new_name='album',
        ),
    ]
