# Git commands

# Show Git status
[group("Git")]
status:
    @git status

# Show commit history in a single-line view
[group("Git")]
log:
    @git log --pretty=format:"%h | %ad | %an | %s" --date=iso

[group("Git")]
update:
    git fetch origin && git pull

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
