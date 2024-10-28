class BasePage {
  constructor(baseURL) {
      this.baseURL = baseURL;

  }
//  This is another way to store a selector as a more easy to ready var
  get sourceLogo() {
      return cy.get('a.brand-primary.wrapper');
  }

  visit() {
      cy.visit(this.baseURL);
  }

  clickSourceLogo() {
      this.sourceLogo.click();
  }

  verifyUrlContents(text) {
      cy.url().should('include', text);
  }

  verifyH1Text(expectedText) {
      cy.get('h1').should('have.text', expectedText);
  }
}

export default BasePage;
