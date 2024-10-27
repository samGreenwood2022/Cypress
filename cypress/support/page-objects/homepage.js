import BasePage from "./base-page";

class HomePage extends BasePage {
    // Define selectors
    elements = {
      searchInput: () => cy.get('[data-cy="searchFieldSearch"]')
                           .first(),
    };

    enterSearchTerm(searchTerm) {
      console.log(searchTerm); // Debugging step
      this.elements.searchInput().type(searchTerm);
    }

  }
  
  
  export default new HomePage();