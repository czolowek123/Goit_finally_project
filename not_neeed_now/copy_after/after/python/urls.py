from django.urls import path
from django.shortcuts import render
from not_neeed_now.copy_after.after.python.views import index # Импортируем исправленную функцию из views.py

def collections_view(request):
    return render(request, 'collections.html')

def about_view(request):
    return render(request, 'about.html')

def support_view(request):
    return render(request, 'support.html')

def product_detail_view(request, product_id):
    return render(request, 'product_detail.html')

urlpatterns = [
    path('', index, name='home'), # Используем index из views.py
    path('collections/', collections_view, name='collections'),
    path('about/', about_view, name='about'),
    path('support/', support_view, name='support'),
    path('product/<str:product_id>/', product_detail_view, name='product_detail'),
]