## ----------------------------------------------------------------------------
## Dockerfile for running the Cypress + Cucumber test suite headlessly
## ----------------------------------------------------------------------------
## Base image: Use the official Cypress image that already contains all
## system dependencies (Chrome, Firefox, Edge) matching Cypress 14.4.1.
## Ref: https://hub.docker.com/r/cypress/included
FROM cypress/included:14.4.1

LABEL org.opencontainers.image.source="https://github.com/samGreenwood2022/Cypress" \
      org.opencontainers.image.description="Cypress E2E + Cucumber test runner" \
      org.opencontainers.image.licenses="ISC"

# Set working directory inside the container
WORKDIR /e2e

# Copy only manifest first for better layer caching
COPY package.json ./
# Copy lock file if present (ignored if it does not exist)
COPY package-lock.json* ./

# Install dependencies (all are devDependencies, that's fine here)
RUN npm install --legacy-peer-deps --no-audit --no-fund \
    && npm cache clean --force

# Copy the rest of the project (feature files, config, support code, etc.)
COPY cypress.config.js ./
COPY cypress ./cypress
COPY README.md ./
COPY a11y-violations.log* ./ 2>/dev/null || true /

# Environment variables (override at run time with -e)
ENV CI=1 \
    CYPRESS_CACHE_FOLDER=/root/.cache/Cypress

# Default command executes the full Cypress test run.
# Override (e.g.) with: docker run <img> npx cypress run --spec "cypress/e2e/5-features/dyson-homepage.feature"
CMD ["npx", "cypress", "run"]
