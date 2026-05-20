#!/usr/bin/env python
import importlib.util
import os
import sys
from pathlib import Path


def find_settings_module(current_dir):
    existing_settings_module = os.environ.get('DJANGO_SETTINGS_MODULE', '').strip()

    if existing_settings_module and importlib.util.find_spec(existing_settings_module):
        return existing_settings_module

    settings_candidates = [
        ('pro_settings', current_dir / 'pro_settings.py'),
        ('settings', current_dir / 'settings.py'),
        ('myproject.settings', current_dir / 'myproject' / 'settings.py'),
    ]

    for module_name, module_path in settings_candidates:
        if module_path.is_file():
            return module_name

    raise RuntimeError(
        "Django settings file was not found. "
        "Add settings.py, pro_settings.py, myproject/settings.py, "
        "or set DJANGO_SETTINGS_MODULE to an existing settings module."
    )


def main():
    current_dir = Path(__file__).resolve().parent
    current_dir_text = str(current_dir)

    os.chdir(current_dir_text)

    if current_dir_text not in sys.path:
        sys.path.insert(0, current_dir_text)

    python_path = os.environ.get('PYTHONPATH', '')
    python_path_parts = [path for path in python_path.split(os.pathsep) if path]

    if current_dir_text not in python_path_parts:
        python_path_parts.insert(0, current_dir_text)
        os.environ['PYTHONPATH'] = os.pathsep.join(python_path_parts)

    os.environ['DJANGO_SETTINGS_MODULE'] = find_settings_module(current_dir)

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
