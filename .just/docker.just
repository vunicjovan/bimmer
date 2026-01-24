# Docker recipes

# Docker Compose file path
COMPOSE_FILE := ".docker/docker-compose.yaml"

# Enter PSQL via Docker
[group("Docker")]
psql:
    docker compose -f {{COMPOSE_FILE}} exec db psql -U $POSTGRES_USER $POSTGRES_DB

# Run just database via Docker
[group("Docker")]
docker-db:
    docker compose -f {{COMPOSE_FILE}} up db

# Run full stack via Docker
[group("Docker")]
docker-stack:
    docker compose -f {{COMPOSE_FILE}} up --build

# Run full stack with dev tools (Dozzle, IT-Tools)
[group("Docker")]
docker-stack-dev:
    docker compose -f {{COMPOSE_FILE}} --profile dev-tools up --build

# Stop Docker services and perform cleanup
[group("Docker")]
docker-stop:
    docker compose -f {{COMPOSE_FILE}} --profile dev-tools down -v
