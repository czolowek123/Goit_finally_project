#!/usr/bin/env python
import os
import sys

def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError("Could not import Django.") from exc

    port = os.environ.get('PORT', '8000')
    if len(sys.argv) == 1:
        args = [sys.argv[0], 'runserver', f'0.0.0.0:{port}']
    else:
        args = sys.argv

    execute_from_command_line(args)

if __name__ == '__main__':
    main()
