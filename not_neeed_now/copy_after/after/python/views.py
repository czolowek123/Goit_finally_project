from django.shortcuts import render

def index(request):
    products = [
        {
            'title': 'AVANGARD SPECIAL',
            'price': '4 000',
            'image': 'images/avangard 1.jpg',
            'is_sold': False,
        },
        {
            'title': 'BALANCE GOLD',
            'price': '2 500',
            'image': 'images/balance 1.jpg',
            'is_sold': False,
        },
        {
            'title': 'BALANCE GOLD II',
            'price': '2 500',
            'image': 'images/balance 2.jpg',
            'is_sold': False,
        },
        {
            'title': 'CLASSIC EDITION',
            'price': '2 500',
            'image': 'images/classic 1.jpg',
            'is_sold': False,
        },
        {
            'title': 'CLASSIC EDITION II',
            'price': '2 500',
            'image': 'images/classic 2.jpg',
            'is_sold': False,
        },
    ]
    return render(request, 'index.html', {'products': products})
