# List available Just recipes
default:
    @just --list

### Git commands ###

# Show Git status
[group("Git")]
status:
    git status

[group("Git")]
log:
    git log --pretty=format:"%h | %ad | %an | %s" --date=iso


### Django commands ###

# Create a new Django app
[group("Django")]
django-app app_name:
    cd bimmer && uv run python manage.py startapp {{app_name}} apps/{{app_name}}

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

### General recipes ###

# Run both back-end and front-end with log prefixes and proper Ctrl+C handling
[group("General")]
run:
    just runserver & just npm-run-dev
