# Load environment variables
set dotenv-load

# List available Just recipes
default:
    @just --list

### Git commands ###

# Show Git status
[group("Git")]
status:
    @git status

# Show commit history in a single-line view
[group("Git")]
log:
    @git log --pretty=format:"%h | %ad | %an | %s" --date=iso

# Create a feature branch
[group("Git")]
feature branch_name:
    @if [ -z "{{branch_name}}" ]; then echo "Error: branch_name is required"; exit 1; fi
    @git checkout -b feature/{{branch_name}}

# Create a bugfix branch
[group("Git")]
bugfix branch_name:
    @if [ -z "{{branch_name}}" ]; then echo "Error: branch_name is required"; exit 1; fi
    @git checkout -b bugfix/{{branch_name}}


### UV commands ###

# Sync UV dependencies
[group("UV")]
uv-sync:
    cd bimmer && uv sync


### Django commands ###

# Create a new Django app
[group("Django")]
django-app app_name:
    @if [ -z "{{app_name}}" ]; then echo "Error: app_name is required"; exit 1; fi
    cd bimmer && uv run python manage.py startapp {{app_name}} apps/{{app_name}}

# Apply the currently unapplied migrations
migrate:
    cd bimmer && uv run python manage.py migrate

# Run Django's local server
[group("Django")]
runserver:
    cd bimmer && uv run python manage.py runserver


### React commands ###

# Install Prettier dependency
[group("React")]
install-prettier:
    cd web-app && npm install --save-dev prettier

# Install dependencies
[group("React")]
npm-install:
    cd web-app && npm install

# Run React's dev server
[group("React")]
npm-run-dev:
    cd web-app && npm run dev

### Pre-Commit Recipes ###

# Check pre-commit version
[group("Pre-Commit")]
precommit-version:
    cd bimmer && uv run pre-commit --version

# Install pre-commit hooks
[group("Pre-Commit")]
precommit-install:
    cd bimmer && uv run pre-commit install

[group("Pre-Commit")]
precommit-run:
    uv run pre-commit run --all-files


### Docker recipes ###

# Enter PSQL via Docker
psql:
    docker compose exec db psql -U $POSTGRES_USER $POSTGRES_DB

# Run just database via Docker
docker-db:
    docker compose up db

# Run full stack via Docker
docker-stack:
    docker compose up --build

# Stop Docker services and perform cleanup
docker-stop:
    docker compose down -v

### General recipes ###

# Setup both front- and back-end services
[group("General")]
setup:
    just npm-install && just install-prettier && just uv-sync

# Run TY for type checking on whole back-end project
[group("General")]
typecheck:
    cd bimmer && uv run ty check

# Run both back-end and front-end with log prefixes and proper Ctrl+C handling
[group("General")]
run:
    just runserver & just npm-run-dev
