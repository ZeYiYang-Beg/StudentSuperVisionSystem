# Generated by Django 5.0.3 on 2024-03-24 03:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Student', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='spassword',
            field=models.CharField(db_column='SPassword', default='123456', max_length=100),
        ),
    ]
