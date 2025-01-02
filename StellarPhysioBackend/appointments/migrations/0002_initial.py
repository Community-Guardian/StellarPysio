# Generated by Django 5.1.2 on 2025-01-02 05:06

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('appointments', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='patient',
            field=models.ForeignKey(limit_choices_to={'user_type': 'patient'}, on_delete=django.db.models.deletion.CASCADE, related_name='appointments_as_patient', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='appointment',
            name='provider',
            field=models.ForeignKey(limit_choices_to={'user_type': 'provider'}, on_delete=django.db.models.deletion.CASCADE, related_name='appointments_as_provider', to=settings.AUTH_USER_MODEL),
        ),
    ]
