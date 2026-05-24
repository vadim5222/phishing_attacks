from django.contrib import admin
from .models import *

admin.site.register(Users)
admin.site.register(UrlCheckResults)
admin.site.register(Review)
admin.site.register(Favorite)
