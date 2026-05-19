#!/usr/bin/env python
import os
import sys


def main():
    current_dir = os.path.dirname(os.path.abspath(__file__))

    if current_dir not in sys.path:
        sys.path.insert(0, current_dir)

    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pro_settings')

    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError("Could not import Django.") from exc

    if len(sys.argv) == 1:
        execute_from_command_line([sys.argv[0], 'migrate', '--run-syncdb'])

        port = os.environ.get('PORT', '8000')
        args = [sys.argv[0], 'runserver', f'0.0.0.0:{port}']
    else:
        args = sys.argv

    execute_from_command_line(args)


if __name__ == '__main__':
    main()
