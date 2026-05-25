from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType



class Users(AbstractUser):
    image = models.ImageField(upload_to='users/', verbose_name='Аватар', blank=True, null=True)


class UrlCheckResults(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, blank=True, null=True)
    url = models.URLField(max_length=255)
    label = models.CharField(max_length=255)
    probability = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    favorites = GenericRelation('Favorite')

    def __str__(self):
        return self.url
    

class Review(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    username = models.CharField(max_length=255)
    text = models.TextField()
    score = models.PositiveIntegerField(validators=[MaxValueValidator(5), MinValueValidator(1)])
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username
    

class Favorite(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

    class Meta:
        verbose_name = 'Избранное'
        verbose_name_plural = 'Избранные'
        ordering = ['-id']
        constraints = [
            models.UniqueConstraint(
                fields = ['user', 'object_id', 'content_type'],
                name = 'unique_user_content_type_object_id'
            )
        ]
    


    

    

