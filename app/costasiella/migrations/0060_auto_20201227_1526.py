# Generated by Django 3.0.8 on 2020-12-27 15:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('costasiella', '0059_scheduleeventmedia'),
    ]

    operations = [
        migrations.AlterField(
            model_name='scheduleeventmedia',
            name='schedule_event',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='media', to='costasiella.ScheduleEvent'),
        ),
    ]
