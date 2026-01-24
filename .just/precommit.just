# Pre-Commit Recipes

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
