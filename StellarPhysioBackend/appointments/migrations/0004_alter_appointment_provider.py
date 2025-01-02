# Generated by Django 5.1.2 on 2025-01-02 05:25

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointments', '0003_alter_appointment_provider'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='provider',
            field=models.ForeignKey(blank=True, limit_choices_to={'user_type': 'provider'}, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='appointments_as_provider', to=settings.AUTH_USER_MODEL),
        ),
    ]
