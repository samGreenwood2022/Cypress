/// <reference types="cypress" />

const BasePage = require("./base-page"); // Use require to import the BasePage class

class HomePage extends BasePage {
  // Define selectors for elements on the homepage
  elements = {
    searchInput: () => cy.get('[data-cy="searchFieldSearch"]').first(), // Selector for the search input field
    acceptCookiesButton: () =>
      cy.contains("button", "Accept All Cookies", { timeout: 10000 }), // Selector for the accept cookies button
  };

  // Method to enter a search term and click on the 'Dyson' element in the search results
  enterSearchTerm(searchTerm) {
    this.elements
      .searchInput()
      .should("exist", { timeout: 10000 }) // Ensure the search input field exists
      .should("be.visible", { timeout: 10000 }) // Ensure the search input field is visible
      .type(searchTerm); // Type the search term

      this.clickToRemoveSurvey();

    // Wait for the search results to appear and ensure "Dyson" is visible
    cy.contains("Dyson", { timeout: 10000 })
      .should("be.visible", { timeout: 10000 }) // Ensure the 'Dyson' element is visible
      .click(); // Click on the 'Dyson' element
  }

  clickToRemoveSurvey() {
    cy.wait(2000); // Add a 2 second delay
    cy.get('button#hj-survey-toggle-1').then($btn => {
      if ($btn.length) {
        cy.wrap($btn).click();
      }
    });
  }

  // Method to accept cookies
  acceptCookies() {
    this.elements.acceptCookiesButton().click(); // Click the accept cookies button
  }
}

module.exports = new HomePage(); // Export an instance of HomePage using CommonJS syntax