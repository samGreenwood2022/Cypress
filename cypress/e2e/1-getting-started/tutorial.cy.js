describe("NBS Regression Tests", () => {
  it("navigate to dyson manufacturer homepage", () => {
    cy.visit("https://source.thenbs.com/en/gb");
    cy.get('[data-cy="searchFieldSearch"]').first().type("dyson{enter}");
    cy.get('[data-cy="tabCategory"]').contains("Manufacturers").click();
    cy.get('a[title="View Dyson"]').click()
    cy.url().should("include", "manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview");
  });

  it("assert that the h1 contains 'Dyson'", () => {
    cy.visit("https://source.thenbs.com/en/gb");
    cy.get('[data-cy="searchFieldSearch"]').first().type("dyson{enter}");
    cy.get('[data-cy="tabCategory"]').contains("Manufacturers").click();
    cy.get('a[title="View Dyson"]').click()
    cy.url().should("include", "manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview");
    cy.get('h1').should('contain.text', 'Dyson');
  });

  



});
