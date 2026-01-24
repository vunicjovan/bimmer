# Django commands

# Create a new Django app.
[group("Django")]
django-app app_name:
    @if [ -z "{{app_name}}" ]; then echo "Error: app_name is required"; exit 1; fi
    cd bimmer && uv run python manage.py startapp {{app_name}} apps/{{app_name}}

# Make migrations for the added Django models.
[group("Django")]
makemigrations APP:
    cd bimmer && uv run python manage.py makemigrations {{APP}}

# Apply the currently unapplied migrations.
[group("Django")]
migrate:
    cd bimmer && uv run python manage.py migrate

# Run Django's local server.
[group("Django")]
runserver:
    cd bimmer && uv run python manage.py runserver
