# Generated by Django 3.1.12 on 2021-10-07 12:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('costasiella', '0018_auto_20210930_1046'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='email',
            field=models.EmailField(max_length=254, unique=True, verbose_name='email address'),
        ),
    ]