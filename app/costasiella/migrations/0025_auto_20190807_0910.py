# Generated by Django 2.2.2 on 2019-08-07 09:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('costasiella', '0024_organization'),
    ]

    operations = [
        migrations.AlterField(
            model_name='financeinvoiceitem',
            name='finance_tax_rate',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='costasiella.FinanceTaxRate'),
        ),
        migrations.AlterField(
            model_name='organization',
            name='phone',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='organization',
            name='registration',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='organization',
            name='tax_registration',
            field=models.CharField(default='', max_length=255),
        ),
    ]