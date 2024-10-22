const globals = require("globals");
const pluginJs = require("@eslint/js");
const { FlatCompat } = require('@eslint/eslintrc');
const cypressPlugin = require('eslint-plugin-cypress');

// Use FlatCompat to convert old-style configs to flat config.
const compat = new FlatCompat();

module.exports = {
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
      ...globals.commonjs,
      cy: 'readonly',
      context: 'readonly',
      beforeEach: 'readonly',
      afterEach: 'readonly',
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ["**/*.cy.js", "**/*.cy.jsx"],  // Adjust the patterns as needed
      env: {
        browser: true,
        node: true,
        'cypress/globals': true,  // Recognize Cypress globals
      },
      plugins: ['cypress'],
      extends: ['plugin:cypress/recommended'],
      rules: {
        // Add any specific rules you need
      },
    },
  ],
};
