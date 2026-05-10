import os
import json
import urllib.request
from django.urls import path, re_path
from django.shortcuts import render
from django.conf import settings
from django.views.static import serve
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.http import require_POST, require_GET


def _ctx(request):
    return {'google_client_id': getattr(settings, 'GOOGLE_CLIENT_ID', '')}


def home(request):
    return render(request, 'index.html', _ctx(request))


def collections_view(request):
    return render(request, 'collections.html', _ctx(request))


def about_view(request):
    return render(request, 'about.html', _ctx(request))


def support_view(request):
    return render(request, 'support.html', _ctx(request))


def product_detail_view(request, product_id):
    return render(request, 'product_detail.html', _ctx(request))


def api_register(request):
    if request.method != 'POST':
        return JsonResponse({'ok': False, 'error': 'POST only'}, status=405)
    try:
        data = json.loads(request.body)
    except Exception:
        return JsonResponse({'ok': False, 'error': 'Invalid JSON'}, status=400)

    email = data.get('email', '').strip().lower()
    password = data.get('password', '')
    first_name = data.get('first_name', '').strip()
    last_name = data.get('last_name', '').strip()

    if not email or not password:
        return JsonResponse({'ok': False, 'error': 'Email and password required'}, status=400)

    if len(password) < 4:
        return JsonResponse({'ok': False, 'error': 'Password too short (min 4)'}, status=400)

    if User.objects.filter(username=email).exists():
        return JsonResponse({'ok': False, 'error': 'Account already exists'}, status=400)

    user = User.objects.create_user(
        username=email,
        email=email,
        password=password,
        first_name=first_name,
        last_name=last_name,
    )
    login(request, user)
    return JsonResponse({
        'ok': True,
        'user': {
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
        }
    })


def api_login(request):
    if request.method != 'POST':
        return JsonResponse({'ok': False, 'error': 'POST only'}, status=405)
    try:
        data = json.loads(request.body)
    except Exception:
        return JsonResponse({'ok': False, 'error': 'Invalid JSON'}, status=400)

    email = data.get('email', '').strip().lower()
    password = data.get('password', '')

    if not email or not password:
        return JsonResponse({'ok': False, 'error': 'Email and password required'}, status=400)

    user = authenticate(request, username=email, password=password)
    if user is not None:
        login(request, user)
        return JsonResponse({
            'ok': True,
            'user': {
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
            }
        })
    else:
        return JsonResponse({'ok': False, 'error': 'Invalid email or password'}, status=401)


def api_logout(request):
    if request.method != 'POST':
        return JsonResponse({'ok': False, 'error': 'POST only'}, status=405)
    logout(request)
    return JsonResponse({'ok': True})


def api_user(request):
    if request.user.is_authenticated:
        return JsonResponse({
            'ok': True,
            'authenticated': True,
            'user': {
                'email': request.user.email,
                'first_name': request.user.first_name,
                'last_name': request.user.last_name,
            }
        })
    return JsonResponse({'ok': True, 'authenticated': False})


def api_google_auth(request):
    if request.method != 'POST':
        return JsonResponse({'ok': False, 'error': 'POST only'}, status=405)

    try:
        data = json.loads(request.body)
    except Exception:
        return JsonResponse({'ok': False, 'error': 'Invalid JSON'}, status=400)

    credential = data.get('credential', '')
    if not credential:
        return JsonResponse({'ok': False, 'error': 'No credential'}, status=400)

    try:
        url = 'https://oauth2.googleapis.com/tokeninfo?id_token=' + credential
        resp = urllib.request.urlopen(url, timeout=10)
        token_data = json.loads(resp.read().decode())
    except Exception:
        return JsonResponse({'ok': False, 'error': 'Token verification failed'}, status=400)

    google_client_id = getattr(settings, 'GOOGLE_CLIENT_ID', '')
    if google_client_id and token_data.get('aud') != google_client_id:
        return JsonResponse({'ok': False, 'error': 'Invalid client ID'}, status=400)

    email = token_data.get('email', '').lower()
    first_name = token_data.get('given_name', '')
    last_name = token_data.get('family_name', '')

    if not email:
        return JsonResponse({'ok': False, 'error': 'No email in token'}, status=400)

    user, created = User.objects.get_or_create(
        username=email,
        defaults={
            'email': email,
            'first_name': first_name,
            'last_name': last_name,
        }
    )

    if not created:
        if first_name:
            user.first_name = first_name
        if last_name:
            user.last_name = last_name
        user.save()

    login(request, user)
    return JsonResponse({
        'ok': True,
        'user': {
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
        }
    })


STATIC_ROOT_DIR = str(settings.STATICFILES_DIRS[0]) if settings.STATICFILES_DIRS else ''

urlpatterns = [
    path('', home, name='home'),
    path('collections/', collections_view, name='collections'),
    path('about/', about_view, name='about'),
    path('support/', support_view, name='support'),
    path('product/<str:product_id>/', product_detail_view, name='product_detail'),
    path('api/register/', api_register, name='api_register'),
    path('api/login/', api_login, name='api_login'),
    path('api/logout/', api_logout, name='api_logout'),
    path('api/user/', api_user, name='api_user'),
    path('api/google-auth/', api_google_auth, name='api_google_auth'),
    re_path(r'^static/(?P<path>.*)$', serve, {'document_root': STATIC_ROOT_DIR}),
]
