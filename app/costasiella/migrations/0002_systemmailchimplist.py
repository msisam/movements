# Generated by Django 3.2.12 on 2022-03-08 10:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('costasiella', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='SystemMailChimpList',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('frequency', models.CharField(max_length=255)),
                ('mailchimp_list_id', models.CharField(max_length=255)),
            ],
        ),
    ]
