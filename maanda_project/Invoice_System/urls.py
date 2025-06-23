from django.contrib import admin
from django.urls import path, include
from . import views
app_name = 'invoices' 
urlpatterns = [
  path('create/', views.create_invoice, name='create-invoice'),
  path('list/', views.invoice_list, name='invoice-list'), 

  path('partial/<uuid:uuid>/', views.invoice_view, name='invoice-view'),
  path('edit/<uuid:uuid>/', views.edit_invoice, name='edit-invoice'),
  path('send/', views.send_invoice, name='send-invoice'),
  path('delete/', views.delete_invoice, name='delete-invoice'),

  # path('view/<uuid:uuid>/', views.view_invoice, name='view-invoice'),
   #path('edit/<uuid:uuid>/', views.edit_invoice, name='edit-invoice'),
  # path('send/<uuid:uuid>/', views.send_invoice, name='send-invoice'),
   #path('delete/<uuid:uuid>/', views.delete_invoice, name='delete-invoice'),
    
    # your other apps' URLs
]
