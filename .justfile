# List available Just recipes
default:
    @just --list

### Git commands ###

# Show Git status
[group("Git")]
status:
    git status


### Django commands ###

# Run Django's local server
[group("Django")]
runserver:
    cd bimmer && uv run python manage.py runserver
