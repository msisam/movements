# Generated by Django 2.2 on 2019-04-07 13:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('costasiella', '0022_auto_20190407_1149'),
    ]

    operations = [
        migrations.AlterField(
            model_name='schoolmembership',
            name='finance_glaccount',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='costasiella.FinanceGLAccount'),
        ),
    ]
