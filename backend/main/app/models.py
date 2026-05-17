from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator


class Users(AbstractUser):
    image = models.ImageField(upload_to='users/', verbose_name='Аватар', blank=True, null=True)


class UrlCheckResults(models.Model):
    url = models.URLField(max_length=255)
    label = models.CharField(max_length=255)
    probability = models.FloatField()

    def __str__(self):
        return self.url
    

class Review(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    text = models.TextField()
    score = models.PositiveIntegerField(validators=[MaxValueValidator(5), MinValueValidator(1)])
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user
    

    

