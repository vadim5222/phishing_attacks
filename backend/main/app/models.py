from django.db import models
from django.contrib.auth.models import AbstractUser


class Users(AbstractUser):
    image = models.ImageField(upload_to='users/', verbose_name='Аватар', blank=True, null=True)


