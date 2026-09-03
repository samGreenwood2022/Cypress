describe("NBS Regression Tests", () => {
  // Scenario 1: search for Dyson and land on their manufacturer page
  it("1 - navigate to dyson manufacturer homepage", () => {
    cy.visit("https://source.thenbs.com/en/gb"); // open the NBS Source homepage
    cy.get('[data-cy="searchFieldSearch"]').first().type("dyson{enter}"); // type in the search box and press Enter

    // Explicit wait: give the results up to 15s to render, then click the tab.
    // Cypress retries this until it passes - no fixed cy.wait(ms) needed.
    cy.get('[data-cy="tabCategory"]', { timeout: 15000 })
      .contains("Manufacturers")
      .should("be.visible") // wait until the tab is actually clickable
      .click(); // filter results to the Manufacturers tab

    // Explicit wait: the filtered list re-renders, so wait for the Dyson link
    cy.get('a[title="View Dyson"]', { timeout: 15000 }).should("be.visible").click();

    cy.url().should("include", "manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview"); // check we're on the right page
  });

  // Scenario 2: the page heading names the manufacturer
  it("2 - assert that the h1 contains 'Dyson'", () => {
    cy.visit("https://source.thenbs.com/en/gb");
    cy.get('[data-cy="searchFieldSearch"]').first().type("dyson{enter}");

    cy.get('[data-cy="tabCategory"]', { timeout: 15000 })
      .contains("Manufacturers")
      .should("be.visible")
      .click();

    cy.get('a[title="View Dyson"]', { timeout: 15000 }).should("be.visible").click();

    cy.url().should("include", "manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview");

    cy.get('h1').should('contain.text', 'Dyson'); // main heading mentions Dyson
  });

  // Scenario 3: the phone link dials the correct number
  it("3 - assert that the telephone link has the correct number, protocol and href", () => {
    cy.visit("https://source.thenbs.com/en/gb");
    cy.get('[data-cy="searchFieldSearch"]').first().type("dyson{enter}");

    cy.get('[data-cy="tabCategory"]', { timeout: 15000 })
      .contains("Manufacturers")
      .should("be.visible")
      .click();

    cy.get('a[title="View Dyson"]', { timeout: 15000 }).should("be.visible").click();

    cy.url().should("include", "manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview");

    // find any link starting with "tel:" and check the full href
    cy.get('a[href^="tel:"]').should('have.attr', 'href', 'tel:08003457788');
  });

  // Scenario 4: the "Website" link points to Dyson and opens in a new tab
  it("4 - assert that the Dyson website link is correct and opens in a new tab", () => {
    cy.visit("https://source.thenbs.com/en/gb");
    cy.get('[data-cy="searchFieldSearch"]').first().type("dyson{enter}");

    cy.get('[data-cy="tabCategory"]', { timeout: 15000 })
      .contains("Manufacturers")
      .should("be.visible")
      .click();

    cy.get('a[title="View Dyson"]', { timeout: 15000 }).should("be.visible").click();

    cy.url().should("include", "manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview");

    cy.get('a[action="company-website"]') // stable locator - won't change if the URL does
      .should('be.visible') // the link is on screen
      .and('have.attr', 'title', 'Visit https://www.dyson.co.uk/commercial/overview') // tooltip text
      .and('have.attr', 'href', 'https://www.dyson.co.uk/commercial/overview') // destination URL
      .and('have.attr', 'target', '_blank') // _blank = opens in a new tab
      .and('have.attr', 'rel', 'noopener'); // security: stops the new tab accessing this one
  });

});
