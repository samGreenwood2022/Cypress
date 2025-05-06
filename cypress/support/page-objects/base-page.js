/// <reference types="cypress" />

class BasePage {
  constructor() {
    this.baseURL = "https://login.thenbs.com/auth/login"; // Base URL for the application
    this.email = "sam_greenwood26@hotmail.com"; // Default email for login
    this.password = "Felix1976"; // Default password for login
  }

  // Define selectors for elements on the page
  elements = {
    sourceLogo: () => cy.get("app-product-logo-with-name").first(), // Selector for the first source logo
    signInField: () => cy.get("#Identification_Email"), // Selector for the sign-in field
    passwordField: () => cy.get("#Authentication_Password"), // Selector for the password field
    submitButton: () => cy.get(".submit-button"), // Selector for the submit button
    nextButton: () => cy.get("#nextButton"), // Selector for the next button
  };

  // Method to verify the href attribute of the source logo
  verifyLinkHref(hrefText) {
    this.elements
      .sourceLogo()
      .find("a") // Locate the <a> tag within <app-product-logo-with-name>, useful for targeting nested attributes
      .should("have.attr", "href", hrefText); // Verify the href attribute
  }

  // Method to visit the base URL
  visit() {
    cy.visit(this.baseURL); // Visit the base URL
  }

  // Method to click the source logo
  clickSourceLogo() {
    this.elements.sourceLogo().click(); // Click the source logo
  }

  // Method to verify the URL contains the expected text
  verifyUrlContents(text) {
    cy.url().should("include", text); // Verify the URL contains the expected text
  }

  // Method to verify the h1 title text
  verifyH1Text(expectedText) {
    cy.get("h1").should("have.text", expectedText); // Verify the h1 title text
  }

  // Method to sign in to the application
  signIn() {
    this.elements
      .signInField()
      .should("exist") // Ensure the sign-in field exists
      .should("be.visible") // Ensure the sign-in field is visible
      .type(this.email); // Use the email defined in the constructor

    this.elements.submitButton().click(); // Click the submit button

    this.elements
      .passwordField()
      .should("exist") // Ensure the password field exists
      .should("be.visible") // Ensure the password field is visible
      .type(this.password); // Use the password defined in the constructor

    this.elements.nextButton().click(); // Click the next button

    // Navigate to the Source website where we will begin our tests
    cy.visit('https://source.thenbs.com/');
  }
}

module.exports = BasePage; // Export the class using CommonJS syntax