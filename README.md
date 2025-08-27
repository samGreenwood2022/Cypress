Here is the spell-checked content of your README.md file:

```
This is a small Cypress project that runs various tests against https://source.thenbs.com/

The main purpose of the project is to demonstrate the following:
  - Different ways of interacting with and verifying web element attributes
  - Using the Page Object Model design pattern
  - Independent tests
  - Repository created in GitHub
  - CI Pipeline Integration
  - Implementation of the Axe-plugin for usability reporting
  - API Testing
  - Cucumber/Gherkin and Feature file implementation

Installations Required
VSCode
Node.js
Git
```

## Running the test suite in Docker

You can build a self‑contained image that has all browsers and dependencies preinstalled.

1. Build the image (from the project root):
  ```pwsh
  docker build -t cypress-tests .
  ```
2. Run the full test suite headlessly:
  ```pwsh
  docker run --rm cypress-tests
  ```
3. Run a single feature/spec (example – Dyson homepage feature):
  ```pwsh
  docker run --rm cypress-tests npx cypress run --spec "cypress/e2e/5-features/dyson-homepage.feature"
  ```
4. (Optional) Mount artifacts back to the host so screenshots/videos persist:
  ```pwsh
  docker run --rm `
    -v ${PWD}/cypress/screenshots:/e2e/cypress/screenshots `
    -v ${PWD}/cypress/videos:/e2e/cypress/videos `
    cypress-tests
  ```

Environment variables (e.g. record key) can be passed with `-e`:
```pwsh
docker run --rm -e CYPRESS_RECORD_KEY=$env:CYPRESS_RECORD_KEY cypress-tests npx cypress run --record --key $env:CYPRESS_RECORD_KEY
```

If you prefer developing locally but running dependencies in Docker, you can instead mount the whole project (hot‑reloading test code without rebuilding the image):
```pwsh
docker run --rm -v ${PWD}:/e2e cypress/included:14.4.1 npx cypress run
```

> Note: `cypress open` (interactive mode) requires a display and is not typically used inside a plain Docker container. Use headless `cypress run` in CI.
```
