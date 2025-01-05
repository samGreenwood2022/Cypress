const BasePage = require("./base-page");

class ManufacturerHomePage extends BasePage {
  // Define selectors on the manufacturer homepage
  elements = {
    telephoneLink: () => cy.get('a[action="telephone"]'),
    favouritesIcon: () => cy.get("app-add-to-collection-button").first(),
    permalinkIcon: () => cy.get('[data-cy="copyPermalinkButton"]'),
    manufacturerWebLink: () => cy.get('a[action="company-website"]'),
    contactManufacturerButton: () => cy.contains('button', 'Contact manufacturer'),
    h1Title: () => cy.get('h1')
  };

  verifyTelephoneLinkAttribute(telNo) {
    this.elements
      .telephoneLink()
      .should("exist") // Ensure the element exists
      .and("have.attr", "href", telNo); // Verify the href attribute and Tel protocol
  }

  verifyH1Text(expectedText) {
    this.elements
      .h1Title()
      .should("exist") // Ensure the element exists
      .and("have.text", expectedText); // Verify the text of the h1 element
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
      .and("have.attr", "href", href); // Verify the href attribute
  }

  verifyContactManufacturerBtnTxt(btnTxt) {
    this.elements
      .contactManufacturerButton()
      .should("exist") // Ensure the element exists
      .and("contain.text-", btnTxt); // Verify the text of the button

  }



}

module.exports = ManufacturerHomePage;
