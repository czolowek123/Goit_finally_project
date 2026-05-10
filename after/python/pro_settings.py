import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

SECRET_KEY = 'hefastos-luxury-jewellery-secret-key-2024'
DEBUG = True
ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.staticfiles',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
]

templates_candidates = [
    BASE_DIR.parent / 'HTML',
    BASE_DIR / 'templates',
    BASE_DIR / 'HTML',
]

TEMPLATES_DIR = BASE_DIR / 'templates'
for candidate in templates_candidates:
    if candidate.is_dir():
        TEMPLATES_DIR = candidate
        break

static_candidates = [
    BASE_DIR.parent / 'static',
    BASE_DIR / 'static',
]

STATIC_DIR = BASE_DIR / 'static'
for candidate in static_candidates:
    if candidate.is_dir():
        STATIC_DIR = candidate
        break

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [TEMPLATES_DIR],
        'APP_DIRS': False,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
            ],
        },
    },
]

STATIC_URL = '/static/'
STATICFILES_DIRS = [STATIC_DIR]
STATIC_ROOT = BASE_DIR / 'staticfiles'

ROOT_URLCONF = 'urls'

WSGI_APPLICATION = None

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID', '')
