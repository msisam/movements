# Generated by Django 3.1.5 on 2021-05-07 12:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('costasiella', '0009_auto_20210225_1943'),
    ]

    operations = [
        migrations.CreateModel(
            name='FinancePaymentBatchCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('archived', models.BooleanField(default=False)),
                ('name', models.CharField(max_length=255)),
                ('batch_category_type', models.CharField(choices=[('COLLECTION', 'Collection'), ('PAYMENT', 'Payment')], max_length=255)),
                ('description', models.CharField(default='', max_length=255)),
            ],
        ),
    ]