// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import "cypress-axe";
const LoginPage = require("./page-objects/login-page");

Cypress.Commands.add("setSurveyDismissFlags", (pollId = "1657266") => {
  const done = `${pollId}%2C${pollId}`;
  cy.window({ log: false }).then((win) => {
    try {
      win.localStorage.setItem("_hjMinimizedPolls", pollId);
      win.localStorage.setItem("_hjDonePolls", done);
    } catch (e) {
      // Surface a clear error if localStorage is not accessible
      throw new Error(
        `Failed to set survey flags in localStorage: ${e?.message || e}`,
      );
    }
  });
});

// An example of a custom command to log in a user using cy.origin for cross-origin handling
Cypress.Commands.add("loginUser", () => {
  // store the current URL to compare after login
  cy.url().as("currentUrl");

  // Initiate sign in from the source domain
  cy.contains("button", "Sign in", { timeout: 10000 }).click();

  // Credentials come from cypress.env.json (gitignored) or CYPRESS_* env vars.
  // Never hardcode them here - this file is committed to git.
  const email = Cypress.env("userEmail");
  const password = Cypress.env("userPassword");

  if (!email || !password) {
    throw new Error(
      "Missing login credentials. Copy cypress.env.example.json to " +
        "cypress.env.json and fill in userEmail / userPassword, or set the " +
        "CYPRESS_userEmail and CYPRESS_userPassword environment variables.",
    );
  }

  // Perform cross-origin login steps — selectors sourced from LoginPage POM
  const args = {
    email,
    password,
    selectors: LoginPage.selectors,
    timeout: LoginPage.timeout,
  };
  cy.origin(
    "https://login.thenbs.com",
    { args },
    ({ email, password, selectors, timeout }) => {
      cy.get(selectors.emailField).type(email);
      cy.contains(selectors.nextText, { timeout }).click();
      cy.get(selectors.passwordField).type(password);
      cy.contains("button", selectors.signInText, { timeout }).click();
    },
  );

  // Wait for OAuth redirect back to source before asserting
  cy.url({ timeout: 15000 }).should("include", "source.thenbs.com");
  cy.get("@currentUrl").then((currentUrl) => {
    cy.url().should("include", currentUrl);
  });
});
