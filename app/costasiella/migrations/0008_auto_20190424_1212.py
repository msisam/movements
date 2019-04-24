# Generated by Django 2.2 on 2019-04-24 12:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('costasiella', '0007_auto_20190424_1208'),
    ]

    operations = [
        migrations.AlterField(
            model_name='organizationclasspass',
            name='price',
            field=models.DecimalField(decimal_places=2, max_digits=20),
        ),
        migrations.AlterField(
            model_name='organizationmembership',
            name='price',
            field=models.DecimalField(decimal_places=2, max_digits=20),
        ),
        migrations.AlterField(
            model_name='organizationsubscription',
            name='quick_stats_amount',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=20),
        ),
        migrations.AlterField(
            model_name='organizationsubscription',
            name='registration_fee',
            field=models.DecimalField(decimal_places=2, max_digits=20),
        ),
    ]
