/// <reference types="cypress" />

const BasePage = require("./base-page");

// The Source search homepage
class HomePage extends BasePage {
  get elements() {
    return {
      ...super.elements, // Keep the shared selectors from BasePage
      searchInput: () => cy.get('[data-cy="searchFieldSearch"]').first(),
      acceptCookiesButton: () =>
        cy.contains("button", "Accept All Cookies", { timeout: 10000 }),
    };
  }

  /* Aliases
   * An alias saves something under a name so you can reuse it later:
   *   .as("name")      saves an element, request or value
   *   cy.get("@name")  reads back an element or value
   *   cy.wait("@name") waits for a saved network request
   * The methods below are examples of each. */

  // Save the search input so later steps don't have to re-query it
  aliasSearchInput() {
    this.elements.searchInput().as("searchInput");
  }

  // Type into the aliased input. Call aliasSearchInput() first.
  typeInAliasedSearch(term) {
    cy.get("@searchInput", { timeout: 15000 })
      .should("be.visible")
      .clear()
      .type(term);
  }

  // Watch for a network request. Must be called BEFORE the action that triggers it.
  aliasGeoLocationRequest() {
    cy.intercept("GET", "**/cookieconsentpub/v1/geo/location*").as(
      "geoLocation",
    );
  }

  // Wait for that request to finish and check it succeeded
  waitForGeoLocation() {
    cy.wait("@geoLocation").its("response.statusCode").should("eq", 200);
  }

  // Save any plain value under an alias. cy.wrap() hands it to Cypress first.
  aliasComputedValue(name, value) {
    cy.wrap(value).as(name);
  }

  // Read a saved value back and print it to the Cypress command log
  logAliasedValue(name) {
    cy.get(`@${name}`).then((val) => {
      Cypress.log({
        name: "aliased-data",
        message: `${name} = ${JSON.stringify(val)}`,
      });
    });
  }

  // Search for a term, then open the "Dyson" result
  enterSearchTerm(searchTerm) {
    this.aliasSearchInput();
    this.typeInAliasedSearch(searchTerm);

    cy.contains("Dyson", { timeout: 10000 })
      .as("dysonResult")
      .should("be.visible")
      .click({ force: true }); // force: the element can be overlapped by the survey popup
  }

  clickToRemoveSurvey() {
    cy.wait(2000);
    cy.get("button#hj-survey-toggle-1").then(($btn) => {
      if ($btn.length) {
        cy.wrap($btn).click();
      }
    });
  }

  acceptCookies() {
    this.elements.acceptCookiesButton().click();
  }
}

module.exports = HomePage;
