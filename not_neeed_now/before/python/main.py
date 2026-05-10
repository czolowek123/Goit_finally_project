import os
import sys

def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pro_settings')
    
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
"Не удалось импортировать Django. Убедись, что он установлен."
        ) from exc


    if len(sys.argv) == 1:
        args = [sys.argv[0], "runserver", "127.0.0.1:8000"]
    else:
        args = sys.argv

    execute_from_command_line(args)

if __name__ == "__main__":
    main()