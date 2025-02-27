# Generated by Django 5.1.2 on 2025-01-03 06:44

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointments', '0005_alter_appointment_patient'),
        ('services', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='service',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='appointments', to='services.service', verbose_name='Service'),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='duration',
            field=models.PositiveIntegerField(default=60, help_text='Duration in minutes'),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='status',
            field=models.CharField(choices=[('UPCOMMING', 'Upcomming'), ('PAST', 'Past'), ('CANCELLED', 'Cancelled')], default='UPCOMMING', max_length=10),
        ),
    ]
