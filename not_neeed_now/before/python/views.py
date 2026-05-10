from django.shortcuts import render

def index(request):
    products = [
        {
            'title': 'AVANGARD SPECIAL',
            'price': '15 000',
            'image': 'images/avangard 1.jpg', 
            'is_sold': True,
        },
        {
            'title': 'BALANCE GOLD',
            'price': '12 300',
            'image': 'images/balance 1.jpg',
            'is_sold': False,
        },
        {
            'title': 'CLASSIC EDITION',
            'price': '9 800',
            'image': 'images/classic 1.jpg',
            'is_sold': False,
        },
    ]
    return render(request, 'index.html', {'products': products})