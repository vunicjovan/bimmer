# List available Just recipes
default:
    @just --list

### Git commands ###

# Show Git status
[group("Git")]
status:
    git status


### Django commands ###

# Create a new Django app
[group("Django")]
django-app app_name:
    cd bimmer && uv run python manage.py startapp {{app_name}} apps/{{app_name}}

# Run Django's local server
[group("Django")]
runserver:
    cd bimmer && uv run python manage.py runserver
