# mash_stack/views.py
from django.shortcuts import render

def home_view(request):
    return render(request, "home.html")

def sidebar_view(request):
    return render(request, 'sidebar.html')
def custom_404_view(request, exception):
    return render(request, "display.html", status=404)