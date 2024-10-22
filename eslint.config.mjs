import globals from "globals";
import pluginJs from "@eslint/js";
import { FlatCompat } from '@eslint/eslintrc';
import cypressPlugin from 'eslint-plugin-cypress';

// Use FlatCompat to convert old-style configs to flat config.
const compat = new FlatCompat();

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.commonjs,
        ...globals['cypress/globals'],  // Add Cypress globals explicitly
      },
      ecmaVersion: 12,
      sourceType: 'module',
    },
  },
  pluginJs.configs.recommended,

  {
    plugins: {
      cypress: cypressPlugin, // Correct Cypress plugin configuration
    },CUNT!%^^

    env: {
      browser: true,  // Ensure browser environment is set
      node: true,     // Ensure Node.js environment is set
      'cypress/globals': true,  // Cypress globals like `cy`, `beforeEach`
    },

    extends: ['plugin:cypress/recommended'],  // Extend Cypress recommended rules

    rules: {
      // Optional: You can disable specific rules if necessary
    },
  },
];
