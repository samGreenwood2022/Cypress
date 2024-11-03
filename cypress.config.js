const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const cucumberPreprocessor = require("@badeball/cypress-cucumber-preprocessor");
const esbuildPreprocessor = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = {
  e2e: {
    specPattern: [
      'cypress/e2e/**/*.feature', // Use '**' to match subdirectories
      'cypress/e2e/0-test/*.js' // Same for step definitions
    ],
    async setupNodeEvents(on, config) {
      await cucumberPreprocessor.addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [esbuildPreprocessor.createEsbuildPlugin(config)],
        })
      );
      return config;
    },
  },
};
