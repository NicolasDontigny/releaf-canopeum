# Generated by Django 5.0.3 on 2024-03-24 00:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('canopeum_backend', '0005_remove_batchsupportedspecies_quantity_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Asset',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('asset', models.FileField(upload_to='assets/')),
            ],
        ),
        migrations.RemoveField(
            model_name='siteimage',
            name='image',
        ),
        migrations.RemoveField(
            model_name='postimage',
            name='image',
        ),
        migrations.RemoveField(
            model_name='site',
            name='image',
        ),
        migrations.RemoveField(
            model_name='postimage',
            name='post',
        ),
        migrations.RemoveField(
            model_name='siteimage',
            name='site',
        ),
        migrations.CreateModel(
            name='PostAsset',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('asset', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='canopeum_backend.asset')),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='canopeum_backend.post')),
            ],
        ),
        migrations.CreateModel(
            name='SiteAsset',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('asset', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='canopeum_backend.asset')),
                ('site', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='canopeum_backend.site')),
            ],
        ),
        migrations.DeleteModel(
            name='Image',
        ),
        migrations.DeleteModel(
            name='Postimage',
        ),
        migrations.DeleteModel(
            name='Siteimage',
        ),
    ]
