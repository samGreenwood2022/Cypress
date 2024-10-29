class BasePage {
  constructor(baseURL) {
      this.baseURL = baseURL;

  }

  elements = {
    sourceLogo: () => cy.get('app-product-logo-with-name')
                        .first(),
    // favouritesIcon: () => cy.get('[data-cy="copyPermalinkButton"]'),
  };
//  This is another way to store a selector as a more easy to ready var
//   get sourceLogo() {
//       return cy.get('a.brand-primary.wrapper');
//   }

//   get sourceLogo() {
//     return cy.get('app-product-logo-with-name')
// }
  verifyLinkHref(hrefText){
    this.elements.sourceLogo().should('have.attr', 'href', hrefText)

  }

  visit() {
      cy.visit(this.baseURL);
  }

  clickSourceLogo() {
      this.elements.sourceLogo().click();
  }

  verifyUrlContents(text) {
      cy.url().should('include', text);
  }

  verifyH1Text(expectedText) {
      cy.get('h1').should('have.text', expectedText);
  }
}

export default BasePage;
