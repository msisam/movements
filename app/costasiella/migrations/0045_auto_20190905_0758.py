# Generated by Django 2.2.4 on 2019-09-05 07:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('costasiella', '0044_scheduleitemweeklyotc_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='scheduleitemweeklyotc',
            name='status',
            field=models.CharField(choices=[['', 'Regular'], ['CANCELLED', 'Cancelled'], ['OPEN', 'No teacher']], default='', max_length=255),
        ),
    ]