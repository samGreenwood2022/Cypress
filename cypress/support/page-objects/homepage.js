const BasePage = require("./base-page"); // Use require to import the BasePage class

class HomePage extends BasePage {
  // Define selectors
  elements = {
    searchInput: () => cy.get('[data-cy="searchFieldSearch"]').first(),
    acceptCookiesButton: () => cy.contains("button", "Accept All Cookies"),
  };

  enterSearchTerm(searchTerm) {
    console.log(searchTerm); // Debugging step
    this.elements.searchInput().type(searchTerm);
    cy.contains("Dyson").click();
  }

  acceptCookies() {
    this.elements.acceptCookiesButton().click();
  }
}

module.exports = new HomePage(); // Export an instance of HomePage using CommonJS syntax
