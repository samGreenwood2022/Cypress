const BasePage = require("./base-page");

class ManufacturerHomePage extends BasePage {
  // Define selectors on the manufacturer homepage
  elements = {
    telephoneLink: () => cy.get('a[action="telephone"]'), // Selector for the telephone link
    favouritesIcon: () => cy.get("app-add-to-collection-button").first(), // Selector for the first favourites icon
    permalinkIcon: () => cy.get('[data-cy="copyPermalinkButton"]'), // Selector for the permalink icon
    manufacturerWebLink: () => cy.get('a[action="company-website"]'), // Selector for the manufacturer website link
    contactManufacturerButton: () => cy.contains('button', 'Contact manufacturer'), // Selector for the contact manufacturer button
    h1Title: () => cy.get('h1'), // Selector for the h1 title
    dysonImage: () => cy.get('img[alt="Dyson"]'), // Selector for the Dyson image
    overviewTab: () => cy.get('[data-cy="overviewTab"]'), // Selector for the Overview tab
    productsTab: () => cy.get('[data-cy="productsTab"]'), // Selector for the Products tab
    cpdTab: () => cy.get('[data-cy="cpdTab"]'), // Selector for the CPD tab
    certificatesTab: () => cy.get('[data-cy="certificatesTab"]'), // Selector for the Third party certifications tab
    literatureTab: () => cy.get('[data-cy="literatureTab"]'), // Selector for the Literature tab
    caseStudiesTab: () => cy.get('[data-cy="caseStudiesTab"]'), // Selector for the Case studies tab
    aboutTab: () => cy.get('[data-cy="aboutTab"]') // Selector for the About us tab
  };

  // Method to verify the telephone link attribute
  verifyTelephoneLinkAttribute(telNo) {
    this.elements
      .telephoneLink()
      .should("exist") // Ensure the telephone link element exists
      .and("have.attr", "href", telNo); // Verify the href attribute and Tel protocol
  }

  // Method to verify the h1 title text
  verifyH1Text(expectedText) {
    this.elements
      .h1Title()
      .should("exist", { timeout: 10000 }) // Ensure the h1 title element exists
      .and("have.text", expectedText); // Verify the text of the h1 element
  }

  // Method to verify the favourites icon exists
  verifyFavIcon() {
    this.elements.favouritesIcon().should("exist"); // Ensure the favourites icon element exists
  }

  // Method to verify the permalink icon exists
  verifyFavPermalinkIcon() {
    this.elements.permalinkIcon().should("exist"); // Ensure the permalink icon element exists
  }

  // Method to verify the manufacturer website link attribute
  verifyManufacturerWebLink(href) {
    this.elements
      .manufacturerWebLink()
      .should("exist") // Ensure the manufacturer website link element exists
      .and("have.attr", "href", href); // Verify the href attribute
  }

  // Method to verify the contact manufacturer button text
  verifyContactManufacturerBtnTxt(btnTxt) {
    debugger;
    this.elements
      .contactManufacturerButton()
      .should("exist", { timeout: 10000 }) // Ensure the contact manufacturer button element exists
      .and("contain.text", btnTxt); // Verify the text of the button
  }

  // Method to verify the Dyson image attributes
  verifyDysonImageAttributes() {
    this.elements
      .dysonImage()
      .should("exist") // Ensure the Dyson image element exists
      .and("have.attr", "loading", "lazy") // Verify the loading attribute is lazy
      .and("have.attr", "alt", "Dyson") // Verify the alt attribute is Dyson
      .and("have.attr", "src", "https://asset.source.thenbs.com/api/thumbnail/726605f6-42fe-4370-ae91-970cd904f976"); // Verify the src attribute
  }

  // Method to verify the tabs are visible and have the correct href attributes
  verifyTabs() {
    const tabs = [
      { element: this.elements.overviewTab, href: "/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview" },
      { element: this.elements.productsTab, href: "/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/products" },
      { element: this.elements.cpdTab, href: "/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/cpd" },
      { element: this.elements.certificatesTab, href: "/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/third-party-certifications" },
      { element: this.elements.literatureTab, href: "/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/literature" },
      { element: this.elements.caseStudiesTab, href: "/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/case-studies" },
      { element: this.elements.aboutTab, href: "/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/about" }
    ];

    tabs.forEach(tab => {
      tab.element()
        .should("exist") // Ensure the tab element exists
        .and("be.visible") // Ensure the tab element is visible
        .and("have.attr", "href", tab.href); // Verify the href attribute of the tab
    });
  }
}

module.exports = ManufacturerHomePage;