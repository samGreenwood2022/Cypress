class BasePage {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  elements = {
    sourceLogo: () => cy.get("app-product-logo-with-name").first(),
    // favouritesIcon: () => cy.get('[data-cy="copyPermalinkButton"]'),
  };

  //   get sourceLogo() {
  //     return cy.get('app-product-logo-with-name')
  // }

  verifyLinkHref(hrefText) {
    this.elements
      .sourceLogo()
      .find("a") // Locate the <a> tag within <app-product-logo-with-name>, usefull for targetting nested attributes
      .should("have.attr", "href", hrefText);
  }

  visit() {
    cy.visit(this.baseURL);
  }

  clickSourceLogo() {
    this.elements.sourceLogo().click();
  }

  verifyUrlContents(text) {
    cy.url().should("include", text);
  }

  verifyH1Text(expectedText) {
    cy.get("h1").should("have.text", expectedText);
  }
}

export default BasePage;
