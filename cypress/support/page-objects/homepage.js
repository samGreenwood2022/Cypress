class HomePage {
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