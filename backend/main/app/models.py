from django.db import models
from django.contrib.auth.models import AbstractUser


class Users(AbstractUser):
    image = models.ImageField(upload_to='users/', verbose_name='Аватар', blank=True, null=True)


class UrlCheckResults(models.Model):
    url = models.URLField(max_length=255)
    label = models.CharField(max_length=255)
    probability = models.FloatField()



