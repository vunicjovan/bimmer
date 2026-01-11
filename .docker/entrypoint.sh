#!/bin/bash
set -e

host="$1"
port="$2"
shift 2
cmd="$@"

echo "Waiting for PostgreSQL at $host:$port..."
while ! nc -z "$host" "$port"; do
  sleep 2
done

echo "PostgreSQL is ready!"
sleep 3  # Give PostgreSQL a moment to fully initialize

# Run migrations
echo "Running migrations..."
cd /app/bimmer
python manage.py migrate

# Then run the command
exec $cmd