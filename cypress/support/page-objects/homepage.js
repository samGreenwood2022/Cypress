import BasePage from "./base-page";

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

export default new HomePage();
