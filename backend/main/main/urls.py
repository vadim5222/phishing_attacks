from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from rest_framework import routers
from app.views import UrlResultsViewSet


router = routers.SimpleRouter()
router.register(r'urls', UrlResultsViewSet, basename='urls')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('app.urls')),
    path('api/', include(router.urls))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

