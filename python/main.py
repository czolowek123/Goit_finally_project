import os
import sys

def run():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    root_dir = os.path.dirname(current_dir)
    
    sys.path.insert(0, root_dir)
    sys.path.insert(0, current_dir)

    os.environ['DJANGO_SETTINGS_MODULE'] = 'pro_settings'

    from django.core.management import execute_from_command_line
    execute_from_command_line([sys.argv[0], 'runserver'])

if __name__ == "__main__":
    run()