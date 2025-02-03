/// <reference types="cypress" />

class BasePage {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.email = 'sam_greenwood26@hotmail.com'; // Declare the email variable
    this.password = 'Felix1976'; // Declare the password variable
  }

  elements = {
    sourceLogo: () => cy.get("app-product-logo-with-name").first(),
    signInField: () => cy.get('#Identification_Email'), // Replace 'signInFieldId' with the actual ID of the sign-in field
    passwordField: () => cy.get('#Authentication_Password'), // Replace 'passwordFieldId' with the actual ID of the password field
    submitButton: () => cy.get('.submit-button'),// Selector for the submit button
    nextButton: () => cy.get('#nextButton')// Selector for the submit button
    
    // favouritesIcon: () => cy.get('[data-cy="copyPermalinkButton"]'),
  };

  verifyLinkHref(hrefText) {
    this.elements
      .sourceLogo()
      .find("a") // Locate the <a> tag within <app-product-logo-with-name>, useful for targeting nested attributes
      .should("have.attr", "href", hrefText);
  }

  visit() {
    cy.visit(this.baseURL);
  }

  clickSourceLogo() {
    this.elements.sourceLogo().click();
  }

  verifyUrlContents(text) {
    cy.url().should("include", text);
  }

  verifyH1Text(expectedText) {
    cy.get("h1").should("have.text", expectedText);
  }

  setEmail(email) {
    this.email = email; // Set the email variable
  }

  setPassword(password) {
    this.password = password; // Set the password variable
  }

  signIn() {
    // cy.contains('Sign in')
    //   .click(); // Visit the login page directly
    this.elements.signInField()
      .should('exist') // Ensure the element exists
      .should('be.visible') // Ensure the element is visible
      .type(this.email); // Type the email into the sign-in field

    this.elements.submitButton()
      .click();

    this.elements.passwordField()
      .should('exist') // Ensure the element exists
      .should('be.visible') // Ensure the element is visible
      .type(this.password); // Type the password into the password field

    // // Intercept the network request when the next button is clicked
    // cy.intercept('POST', 'https://api.source.thenbs.com/graphql').as('nextButtonRequest');

    this.elements.nextButton()
      .click();

      cy.contains('NBS Source')
      .invoke('removeAttr', 'target')
      .click()

    // Wait for the intercepted request to complete
    // cy.wait('@nextButtonRequest').then((interception) => {
    //   // Debugging step: Log the intercepted request and response
    //   console.log(interception);
    //   // Ensure the request was successful
    //   expect(interception.response.statusCode).to.equal(200);
    // });
  }
}

module.exports = BasePage; // Export the class using CommonJS syntax