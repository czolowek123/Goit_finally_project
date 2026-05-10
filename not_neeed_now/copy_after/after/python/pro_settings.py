import os
from pathlib import Path

# BASE_DIR — это папка after/python
BASE_DIR = Path(__file__).resolve().parent
# AFTER_DIR — это корневая папка after
AFTER_DIR = BASE_DIR.parent

SECRET_KEY = 'hefastos-luxury-jewellery-secret-key-2024'
DEBUG = True
ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    'django.contrib.staticfiles',
]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        # Указываем на твою папку HTML
        'DIRS': [AFTER_DIR / 'HTML'],
        'APP_DIRS': False,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
            ],
        },
    },
]

STATIC_URL = '/static/'

# Здесь мы регистрируем ВСЕ твои папки со статикой
STATICFILES_DIRS = [
    AFTER_DIR / 'CSS',
    AFTER_DIR / 'JS',
    AFTER_DIR / 'images',
]

ROOT_URLCONF = 'urls'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'