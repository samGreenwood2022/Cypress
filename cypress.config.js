const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  e2e: {
    specPattern: [
      'cypress/e2e/5-features/*.feature', // Define path to feature files
      //'cypress/support/step_definitions/*.js', // Define path for regular specs
      // 'cypress/e2e/support/step_definitions/**/*.js', // Define the glue path
    ],
    //stepDefinitions: 'cypress/support/step_definitions/*.js', // Explicit path to step definitions folder (adjust if necessary)

    async setupNodeEvents(on, config) {
      // Initialize the Cucumber preprocessor plugin
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // Return the updated config object
      return config;
    },
  },
});
