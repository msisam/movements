# Generated by Django 2.2.4 on 2019-09-29 14:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('costasiella', '0049_accountaccepteddocument'),
    ]

    operations = [
        migrations.RenameField(
            model_name='accountaccepteddocument',
            old_name='ip_accepted',
            new_name='client_ip',
        ),
    ]
