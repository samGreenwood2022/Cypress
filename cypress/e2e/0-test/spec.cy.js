import HomePage from '../../support/page-objects/homepage';
import BasePage from '../../support/page-objects/base-page';
import ManufacturerHomePage from '../../support/page-objects/manufacturer-homepage';

describe('My First Test', () => {
  it('Visits the Dyson homepage on Source', () => {
    const baseURL = 'https://source.thenbs.com/';  // Set the base URL
    const basePage = new BasePage(baseURL);        // Pass baseURL to constructor

    basePage.visit();

    cy.get('#onetrust-accept-btn-handler')
      .click();

    HomePage.enterSearchTerm('Dyson');

    cy.contains('Dyson')
      .click();

    // Assertions
    ManufacturerHomePage.verifyTelephoneLinkAttribute(); // Ensure this is a method call

    cy.url().should('include', '/manufacturer/dyson'); // Assert that the url includes '/manufacturer/dyson'

    // Verify that the 'h1' element contains the correct title
    cy.get("h1").should('have.text', 'Dyson');

    // Same as above
    cy.get("h1").contains('Dyson');

    basePage.clickSourceLogo();
  });
});
