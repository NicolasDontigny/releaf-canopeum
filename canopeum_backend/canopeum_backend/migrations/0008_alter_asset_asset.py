# Generated by Django 5.0.3 on 2024-03-24 02:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('canopeum_backend', '0007_site_image_alter_asset_asset_delete_siteasset'),
    ]

    operations = [
        migrations.AlterField(
            model_name='asset',
            name='asset',
            field=models.FileField(upload_to=''),
        ),
    ]
