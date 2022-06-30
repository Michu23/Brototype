# Generated by Django 4.0.5 on 2022-06-30 10:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('User', '0001_initial'),
        ('Batch', '0001_initial'),
        ('Admin', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='group',
            name='domain',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='User.domain'),
        ),
        migrations.AddField(
            model_name='branch',
            name='location',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='Admin.location'),
        ),
        migrations.AddField(
            model_name='batch',
            name='advisor',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='Admin.advisor'),
        ),
        migrations.AddField(
            model_name='batch',
            name='location',
            field=models.ForeignKey(default=1, null=True, on_delete=django.db.models.deletion.SET_NULL, to='Admin.location'),
        ),
    ]
