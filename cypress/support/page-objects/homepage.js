/// <reference types="cypress" />

const BasePage = require("./base-page"); // Use require to import the BasePage class

class HomePage extends BasePage {
  // Define selectors for elements on the homepage
  elements = {
    searchInput: () => cy.get('[data-cy="searchFieldSearch"]').first(), // Selector for the search input field
    acceptCookiesButton: () =>
      cy.contains("button", "Accept All Cookies", { timeout: 10000 }), // Selector for the accept cookies button
  };

  /* --------------------------------------------------------------------------
   * ALIAS HELP (Beginner friendly)
   * An alias in Cypress lets you save ("alias") something you might want to
   * re-use later: DOM elements, network requests, or arbitrary data.
   * You create an alias with .as('name') and later access it with:
   *   cy.get('@name')  (for elements / data)
   *   cy.wait('@name') (for network requests / intercepts)
   * ------------------------------------------------------------------------ */

  // Create an alias for the search input so later steps can re-use it quickly
  aliasSearchInput() {
    this.elements.searchInput().as('searchInput');
  }

  // Example: type into the aliased search input (after aliasSearchInput was called)
  typeInAliasedSearch(term) {
    cy.get('@searchInput') // retrieve previously aliased element
      .should('be.visible')
      .clear()
      .type(term);
  }

  // Alias a network request. Call BEFORE the action that triggers it.
  aliasGeoLocationRequest() {
    cy.intercept('GET', '**/cookieconsentpub/v1/geo/location*').as('geoLocation');
  }

  // Wait on the aliased network call and assert its status code
  waitForGeoLocation() {
    cy.wait('@geoLocation').its('response.statusCode').should('eq', 200);
  }

  // Alias arbitrary data (e.g. value we compute and want later)
  aliasComputedValue(name, value) {
    // cy.wrap wraps a value so Cypress can manage it; then we alias it
    cy.wrap(value).as(name);
  }

  // Retrieve arbitrary data alias in a callback (example usage shown in comments below)
  logAliasedValue(name) {
    cy.get(`@${name}`).then(val => {
      Cypress.log({ name: 'aliased-data', message: `${name} = ${JSON.stringify(val)}` });
    });
  }

  // Method to enter a search term and click on the 'Dyson' element in the search results
  enterSearchTerm(searchTerm) {
    // Create alias for the search input (demonstration)
    this.aliasSearchInput();

    // Use the alias to type instead of calling the selector again
    this.typeInAliasedSearch(searchTerm); // Type the search term via alias

      // this.clickToRemoveSurvey();

    // Wait for the search results to appear, alias the specific result, then click
    cy.contains("Dyson", { timeout: 10000 })
      .as('dysonResult') // alias the found element
      .should("be.visible") // Ensure the 'Dyson' element is visible
      .click({ force: true }); // Click on the 'Dyson' element

    // Example of re-using that element later (purely illustrative):
    // cy.get('@dysonResult').should('have.text', 'Dyson');
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