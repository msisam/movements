# Generated by Django 2.2.10 on 2020-04-13 11:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('costasiella', '0019_integrationlogmollie_payment_data'),
    ]

    operations = [
        migrations.AddField(
            model_name='financeorder',
            name='finance_invoice',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='costasiella.FinanceInvoice'),
        ),
    ]