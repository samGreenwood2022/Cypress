class HomePage {
    // Define selectors
    elements = {
      searchInput: () => cy.get('[data-cy="searchFieldSearch"]')
                            .first(),
    };
  
    
  }
  
  export default new HomePage();