# Generated by Django 3.0.8 on 2020-11-13 21:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('costasiella', '0047_auto_20201109_1655'),
    ]

    operations = [
        migrations.AddField(
            model_name='scheduleitem',
            name='name',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='scheduleitem',
            name='frequency_interval',
            field=models.PositiveSmallIntegerField(choices=[(0, 'Interval unused'), (1, 'Monday'), (2, 'Tuesday'), (3, 'Wednesday'), (4, 'Thursday'), (5, 'Friday'), (6, 'Saturday'), (7, 'Sunday')]),
        ),
        migrations.AlterField(
            model_name='scheduleitem',
            name='organization_level',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='costasiella.OrganizationLevel'),
        ),
        migrations.AlterField(
            model_name='scheduleitem',
            name='schedule_item_type',
            field=models.CharField(choices=[('CLASS', 'Class'), ('EVENT_ACTIVITY', 'Event Activity'), ('APPOINTMENT', 'Appointment')], max_length=50),
        ),
    ]