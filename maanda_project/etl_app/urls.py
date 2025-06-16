from django.urls import path
from . import views
app_name = 'etl' 
urlpatterns = [
    path('', views.index, name='etl-home'),
    path('upload/', views.upload_file, name='upload'),
   
    path('student_view/', views.student_view, name='student_view'),
]
