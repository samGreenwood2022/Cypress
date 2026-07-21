/// <reference types="cypress" />

// Shared parent for every page object.
// Anything here is available on all pages, so it only needs writing once.
class BasePage {
  constructor(baseURL = "https://source.thenbs.com/en/") {
    this.baseURL = baseURL;
  }

  // Selectors are arrow functions so Cypress only looks the element up when
  // it's actually used, not when the page object is created.
  // A getter (not a field) lets child pages add to this list with
  // `{ ...super.elements, ... }` instead of replacing it.
  get elements() {
    return {
      sourceLogo: () => cy.get("app-product-logo-with-name").first(),
    };
  }

  visit() {
    cy.visit(this.baseURL);
  }

  clickSourceLogo() {
    this.elements.sourceLogo().click();
  }

  verifyLinkHref(hrefText) {
    this.elements
      .sourceLogo()
      .find("a") // The href lives on the <a> nested inside the logo component
      .should("have.attr", "href", hrefText);
  }

  verifyUrlContents(text) {
    cy.url().should("include", text);
  }

  verifyH1Text(expectedText) {
    cy.get("h1").should("have.text", expectedText);
  }

  // Wraps the custom command from support/commands.js so any page can log in
  loginUser() {
    cy.loginUser();
  }
}

module.exports = BasePage;
