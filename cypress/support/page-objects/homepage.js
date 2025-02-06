/// <reference types="cypress" />

const BasePage = require("./base-page"); // Use require to import the BasePage class

class HomePage extends BasePage {
  // Define selectors
  elements = {
    searchInput: () => cy.get('[data-cy="searchFieldSearch"]').first(),
    acceptCookiesButton: () =>
      cy.contains("button", "Accept All Cookies", { timeout: 10000 }),
  };

  enterSearchTerm(searchTerm) {
    this.elements
      .searchInput()
      .should("exist", { timeout: 10000 }) // Ensure the element exists
      .should("be.visible", { timeout: 10000 }) // Ensure the element is visible
      .type(searchTerm); // Type the search term

    // Wait for the search results to appear and ensure "Dyson" is visible
    cy.contains("Dyson", { timeout: 10000 })
      .should("be.visible", { timeout: 10000 }) // Ensure the element is visible
      .click(); // Click on the 'Dyson' element
  }

  acceptCookies() {
    this.elements.acceptCookiesButton().click();
  }
}

module.exports = new HomePage(); // Export an instance of HomePage using CommonJS syntax
