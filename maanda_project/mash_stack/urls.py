from django.contrib import admin
from django.urls import path, include
from mash_stack.views import home_view , sidebar_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home_view, name='index'),
    path('sidebar/', sidebar_view, name='sidebar'),
    path('etl/', include('etl_app.urls', namespace='etl')), 
    path('invoices/', include('Invoice_System.urls', namespace='invoices')), 
]
