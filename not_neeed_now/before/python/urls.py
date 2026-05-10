from django.urls import path
from django.shortcuts import render

def home(request):
    return render(request, 'index.html')

def collections_view(request):
    return render(request, 'collections.html')

def about_view(request):
    return render(request, 'about.html')

def support_view(request):
    return render(request, 'support.html')

def product_detail_view(request, product_id):
    return render(request, 'product_detail.html')

urlpatterns = [
    path('', home, name='home'),
    path('collections/', collections_view, name='collections'),
    path('about/', about_view, name='about'),
    path('support/', support_view, name='support'),
    path('product/<str:product_id>/', product_detail_view, name='product_detail'),
]