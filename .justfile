# Load environment variables
set dotenv-load

# Import grouped recipes
import '.just/git.just'
import '.just/uv.just'
import '.just/django.just'
import '.just/react.just'
import '.just/precommit.just'
import '.just/docker.just'

# List all available Just recipes
default:
    @just --list

# Setup for both front- and back-end services
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
