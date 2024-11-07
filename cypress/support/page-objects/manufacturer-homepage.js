const BasePage = require("./base-page"); // Use require to import the BasePage class

class ManufacturerHomePage extends BasePage {
  // Define selectors on the manufacturer homepage
  elements = {
    telephoneLink: () => cy.get('a[action="telephone"]'),
    favouritesIcon: () => cy.get("app-add-to-collection-button").first(),
    permalinkIcon: () => cy.get('[data-cy="copyPermalinkButton"]'),
    manufacturerWebLink: () => cy.get('a[action="company-website"]'),
    contactManufacturerButton: () => cy.contains('button', 'Contact manufacturer'),
  };

  verifyTelephoneLinkAttribute(telNo) {
    debugger;
    this.elements
      .telephoneLink()
      .should("exist") // Ensure the element exists
      .and("have.attr", "href", telNo); // Verify the href attribute and Tel protocol
  }

  verifyFavIcon() {
    this.elements.favouritesIcon().should("exist"); // Ensure the element exists
  }

  verifyFavPermalinkIcon() {
    this.elements.permalinkIcon().should("exist"); // Ensure the element exists
  }

  verifyManufacturerWebLink(href) {
    this.elements
      .manufacturerWebLink()
      .should("exist") // Ensure the element exists
      .and("have.attr", "href", href); // Ensure the element exists
  }

  verifyContactManuButton(title) {
    this.elements
      .contactManufacturerButton()
      .should("exist") // Ensure the element exists
      .and("have.attr", "title", title); // Ensure the element exists
  }
}

module.exports = new ManufacturerHomePage(); // Export an instance of ManufacturerHomePage using CommonJS syntax
