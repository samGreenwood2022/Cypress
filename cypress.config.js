const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const {
  addMatchImageSnapshotPlugin,
} = require("@simonsmith/cypress-image-snapshot/plugin");
const fs = require("fs");
const path = require("path");

module.exports = defineConfig({
  projectId: "4afu4o", // Add this line for Cypress Cloud integration
  env: {
    CAT_API_KEY:
      "live_ZNfnguGTdc4qwwfu7XQUHXykqrzzCyGQKNpovC44dbRfOvGOl2W2fPx2t1P30S7F", // Replace with your actual Cat API key
  },
  e2e: {
    specPattern: [
      "cypress/e2e/5-features/*.feature", // Define path to feature files
      "cypress/e2e/1-getting-started/*.js", // Define path to feature files
      //'cypress/support/step_definitions/*.js', // Define path for regular specs
      // 'cypress/e2e/support/step_definitions/**/*.js', // Define the glue path
    ],
    //stepDefinitions: 'cypress/support/step_definitions/*.js', // Explicit path to step definitions folder (adjust if necessary)

    async setupNodeEvents(on, config) {
      // Initialize the Cucumber preprocessor plugin
      await addCucumberPreprocessorPlugin(on, config);

      // Configure file preprocessor with source maps for Studio
      on("file:preprocessor", (file) => {
        // For .feature files, use the Cucumber preprocessor
        if (file.filePath.includes(".feature")) {
          return createBundler({
            plugins: [createEsbuildPlugin(config)],
            sourcemap: "inline",
          })(file);
        }

        // For .js/.ts files, use simpler esbuild config for Studio compatibility
        return createBundler({
          sourcemap: "inline",
          target: "es2015",
          format: "iife",
          define: {
            "process.env.NODE_ENV": '"development"',
          },
        })(file);
      });

      // Register the cypress-image-snapshot plugin
      addMatchImageSnapshotPlugin(on, config);

      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
      });

      // Return the updated config object
      return config;
    },
  },
});
