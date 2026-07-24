/// <reference types="cypress" />

const BasePage = require("./base-page");

// A manufacturer's profile page, e.g. /en/manufacturer/dyson/...
class ManufacturerHomePage extends BasePage {
  get elements() {
    return {
      ...super.elements, // Keep the shared selectors from BasePage
      telephoneLink: () => cy.get('a[action="telephone"]'),
      favouritesIcon: () => cy.get("app-add-to-collection-button").first(),
      permalinkIcon: () => cy.get('[data-cy="copyPermalinkButton"]'),
      manufacturerWebLink: () => cy.get('a[action="company-website"]'),
      contactManufacturerButton: () =>
        cy.contains("button", "Contact manufacturer"),
      h1Title: () => cy.get("h1"),
      dysonImage: () => cy.get('img[alt="Dyson"]'),
      overviewTab: () => cy.get('[data-cy="overviewTab"]'),
      productsTab: () => cy.get('[data-cy="productsTab"]'),
      cpdTab: () => cy.get('[data-cy="cpdTab"]'),
      certificatesTab: () => cy.get('[data-cy="certificatesTab"]'),
      literatureTab: () => cy.get('[data-cy="literatureTab"]'),
      caseStudiesTab: () => cy.get('[data-cy="caseStudiesTab"]'),
      aboutTab: () => cy.get('[data-cy="aboutTab"]'),
    };
  }

  // Checks the phone number link, e.g. "tel:+448001217794"
  verifyTelephoneLinkAttribute(telNo) {
    this.elements
      .telephoneLink()
      .should("exist", { timeout: 10000 })
      .and("have.attr", "href", telNo);
  }

  // Overrides BasePage.verifyH1Text() to use this page's own h1 selector
  verifyH1Text(expectedText) {
    this.elements
      .h1Title()
      .should("exist", { timeout: 10000 })
      .and("have.text", expectedText);
  }

  verifyFavIcon() {
    this.elements.favouritesIcon().should("exist");
  }

  verifyFavPermalinkIcon() {
    this.elements.permalinkIcon().should("exist");
  }

  verifyManufacturerWebLink(href) {
    this.elements
      .manufacturerWebLink()
      .should("exist")
      .and("have.attr", "href", href);
  }

  verifyContactManufacturerBtnTxt(btnTxt) {
    this.elements
      .contactManufacturerButton()
      .should("exist", { timeout: 10000 })
      .and("contain.text", btnTxt);
  }

  verifyDysonImageAttributes() {
    this.elements
      .dysonImage()
      .should("exist")
      .and("have.attr", "loading", "lazy")
      .and("have.attr", "alt", "Dyson")
      .and(
        "have.attr",
        "src",
        "https://asset.source.thenbs.com/api/thumbnail/726605f6-42fe-4370-ae91-970cd904f976",
      );
  }

  // Checks every tab links to the right page AND sits in the right order
  verifyTabs() {
    const tabs = [
      {
        element: this.elements.overviewTab,
        href: "/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview",
      },
      {
        element: this.elements.productsTab,
        href: "/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/products",
      },
      //{ element: this.elements.cpdTab, href: "/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/cpd" },
      {
        element: this.elements.certificatesTab,
        href: "/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/third-party-certifications",
      },
      {
        element: this.elements.literatureTab,
        href: "/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/literature",
      },
      {
        element: this.elements.caseStudiesTab,
        href: "/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/case-studies",
      },
      {
        element: this.elements.aboutTab,
        href: "/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/about",
      },
    ];

    tabs.forEach((tab, index) => {
      tab
        .element()
        .should("exist", { timeout: 10000 })
        .and("be.visible")
        .and("have.attr", "href", tab.href)
        .closest("[data-cy]")
        .invoke("index") // Position among its siblings, should match the array order
        .should("eq", index);
    });
  }

  // Visual test: compares a screenshot against the saved baseline image
  verifyImageSnapshot() {
    cy.viewport(1000, 4410); // Must match the viewport the baseline was taken at
    cy.wait(2000);
    cy.scrollTo("bottom"); // Forces lazy-loaded images to render
    cy.wait(3000);
    cy.matchImageSnapshot("dyson-homepage", {
      failureThreshold: 0.2, // Tolerate up to 20% difference
      failureThresholdType: "percent",
    });
  }

  // Checks the geolocation API and the UI agree on the user's region
  verifyUIandAPIContent() {
    cy.viewport(1100, 1200); // Region selector is hidden on narrow screens

    cy.request({
      method: "GET",
      url: "https://geolocation.onetrust.com/cookieconsentpub/v1/geo/location",
      failOnStatusCode: false, // Handle a bad status ourselves instead of failing instantly
    }).then((response) => {
      // The API replies as JSONP - jsonFeed({...}) - so pull the JSON out of the wrapper
      const match = response.body.match(/jsonFeed\((.*)\);?/);

      if (!match) {
        throw new Error("Unexpected response format");
      }

      const body = JSON.parse(match[1]);
      expect(["GB", "US"]).to.include(body.country);

      // Now confirm the UI shows the matching region
      cy.get('button[aria-label="Choose location and language"]', {
        timeout: 10000,
      })
        .should("exist")
        .invoke("text")
        .should("contain", "UK");
    });
  }

  // Example of testing an API directly, with no UI involved
  verifyStarWarsAPIResponse() {
    cy.request("GET", "https://swapi.dev/api/people/1/").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq("Luke Skywalker");
      expect(response.body).to.have.property("homeworld");
    });
  }
}

module.exports = ManufacturerHomePage;
