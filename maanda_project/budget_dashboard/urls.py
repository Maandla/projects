from django.contrib import admin
from django.urls import path, include
from . import views

app_name = 'dashboard'

urlpatterns = [
    path('dashboard_view/', views.dashboard_view, name='dashboard_view'),
    path('dashboard_page/', views.dashboard_page, name='dashboard_page'),
    path('dashboard_summary/', views.dashboard_summary, name='dashboard_summary'),  # ✅ Add this

    path('project/<int:project_id>/quarterly/', views.project_quarterly_summary, name='project_quarterly_summary'),
    path('upload_excel/', views.upload_excel, name='upload_excel'),
    


]
