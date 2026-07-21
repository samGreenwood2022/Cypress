/// <reference types="cypress" />

const BasePage = require("./base-page");

// The NBS sign-in page, which lives on a different domain to the rest of the site.
// Used by the cy.loginUser() command in support/commands.js.
class LoginPage extends BasePage {
  // These are static (plain strings, not functions) because cy.origin() runs on
  // another domain and can only be passed simple, copyable values - not selectors
  // that call cy.get().
  static selectors = {
    emailField: "#Identification_Email",
    passwordField: "#Authentication_Password",
    nextText: "Next",
    signInText: "Sign in",
  };

  static timeout = 10000;
}

module.exports = LoginPage;
