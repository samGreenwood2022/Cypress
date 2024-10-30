import BasePage from "./base-page";

class ManufacturerHomePage extends BasePage {
  // Define selectors on the manufacturer homepage
  elements = {
    telephoneLink: () => cy.get('a[action="telephone"]'),
    favouritesIcon: () => cy.get("app-add-to-collection-button").first(),
    permalinkIcon: () => cy.get('[data-cy="copyPermalinkButton"]'),
  };

  verifyTelephoneLinkAttribute(telNo) {
    this.elements
      .telephoneLink()
      .should("exist") // Ensure the element exists
      .and("have.attr", "href", telNo); // Verify the href attribute and Tel protocol
  }

  verifyFavIcon() {
    this.elements.favouritesIcon().should("exist"); // Ensure the element exists
  }

  verifyFavPermalinkIcon() {
    this.elements.favouritesIcon().should("exist"); // Ensure the element exists
  }
}

export default new ManufacturerHomePage();
