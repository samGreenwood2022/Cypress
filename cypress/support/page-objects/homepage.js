const BasePage = require("./base-page"); // Use require to import the BasePage class

class HomePage extends BasePage {
  // Define selectors
  elements = {
    searchInput: () => cy.get('[data-cy="searchFieldSearch"]').first(),
    acceptCookiesButton: () => cy.contains("button", "Accept All Cookies"),
  };

  enterSearchTerm(searchTerm) {
    this.elements.searchInput()
      .should('exist') // Ensure the element exists
      .should('be.visible') // Ensure the element is visible
      .type(searchTerm); // Type the search term
    cy.contains("Dyson").click();
}

  acceptCookies() {
    this.elements.acceptCookiesButton().click();
  }
}

module.exports = new HomePage(); // Export an instance of HomePage using CommonJS syntax
