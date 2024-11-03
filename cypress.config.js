const  createBundler  = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = {
  e2e: {
    specPattern: [
      'cypress/e2e/**/*.feature', // Use '**' to match subdirectories
      'cypress/e2e/0-test/*.js' // Same for step definitions
    ],
    //stepDefinitions: "cypress/support/step_definitions/*.js",
    setupNodeEvents(on, config) {
      // This is required for the preprocessor to be able to generate JSON reports after each run, and more
      return addCucumberPreprocessorPlugin(on, config).then(() => {
        on(
          "file:preprocessor",
          createBundler({
            plugins: [createEsbuildPlugin(config)],
          })
        );
        // Make sure to return the config object as it might have been modified by the plugin.
        return config;
      });
    },
  },
};
