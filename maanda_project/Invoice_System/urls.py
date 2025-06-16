from django.contrib import admin
from django.urls import path, include
app_name = 'invoices' 
urlpatterns = [
    path('admin/', admin.site.urls),
    path('invoices/', include('Invoice_System.urls')),
    # your other apps' URLs
]
