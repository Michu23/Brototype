# Generated by Django 4.0.5 on 2022-06-30 10:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Payment', '0001_initial'),
        ('Student', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='payment',
            name='student',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='Student.student'),
        ),
    ]
