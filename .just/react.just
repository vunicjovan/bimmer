# React commands

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
