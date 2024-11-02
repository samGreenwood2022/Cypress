import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Add Cucumber preprocessor plugin
      addCucumberPreprocessorPlugin(on, config);
      return config;
    },
    specPattern: [
      "cypress/e2e/0-test/*.js",     // Pattern for JavaScript test files
      "cypress/e2e/*.feature" // Pattern for Cucumber feature files
    ],
  },
});
