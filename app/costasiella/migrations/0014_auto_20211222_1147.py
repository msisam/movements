# Generated by Django 3.1.13 on 2021-12-22 11:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('costasiella', '0013_scheduleitememployee'),
    ]

    operations = [
        migrations.CreateModel(
            name='ScheduleItemAccount',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role', models.CharField(choices=[['', 'Regular'], ['SUB', 'Subteacher'], ['ASSISTANT', 'Assistant'], ['KARMA', 'Karma']], default='', max_length=50)),
                ('role_2', models.CharField(choices=[['', 'Regular'], ['SUB', 'Subteacher'], ['ASSISTANT', 'Assistant'], ['KARMA', 'Karma']], default='', max_length=50)),
                ('date_start', models.DateField()),
                ('date_end', models.DateField(default=None, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('account_2', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='account_2', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.RemoveField(
            model_name='scheduleitemteacher',
            name='account',
        ),
        migrations.RemoveField(
            model_name='scheduleitemteacher',
            name='account_2',
        ),
        migrations.RemoveField(
            model_name='scheduleitemteacher',
            name='schedule_item',
        ),
        migrations.AlterField(
            model_name='scheduleitem',
            name='schedule_item_type',
            field=models.CharField(choices=[('CLASS', 'Class'), ('EVENT_ACTIVITY', 'Event Activity'), ('APPOINTMENT', 'Appointment'), ('SHIFT', 'Shift')], max_length=50),
        ),
        migrations.DeleteModel(
            name='ScheduleItemEmployee',
        ),
        migrations.DeleteModel(
            name='ScheduleItemTeacher',
        ),
        migrations.AddField(
            model_name='scheduleitemaccount',
            name='schedule_item',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='costasiella.scheduleitem'),
        ),
    ]