import MyCustomClass from '../../support/source-homepage';
import HomePage from '../../support/page-objects/homepage';
import BasePage from '../../support/page-objects/base-page';

describe('My First Test', () => {
  it('Visits the Dyson homepage on Source', () => {

    const baseURL = 'https://source.thenbs.com/';  // Set the base URL
    const basePage = new BasePage(baseURL);        // Pass baseURL to constructor

    basePage.visit();
    
    cy.get('#onetrust-accept-btn-handler')
     .click();
    // Use of the robust data-cy attribute
    // cy.get('[data-cy="searchFieldSearch"]')
    //   .first()
    //   .click()
    //   .type('Dyson')

    HomePage.enterSearchTerm('Dyson');

    cy.contains('Dyson')
      .click();

    //Assertions
    cy.url().should('include', '/manufacturer/dyson');// Assert that the url includes '/manufacturer/dyson'
    cy.get('a[action="telephone"]').should('exist'); // Assert that the telephone link exists
    cy.get('a[action="telephone"]').should('have.text',' 08003457788 ' ) // Assert that it shows the correct number
    cy.get('a[action=company-website]')
      .should('have.attr', 'href', 'https://www.dyson.co.uk/commercial/overview/architects-designers');

    //  Verify that the 'h1' element contains the correct title
    cy.get("h1").should('have.text', 'Dyson');

    // Same as above
    cy.get("h1").contains('Dyson');

  
    basePage.clickSourceLogo();

  })
})