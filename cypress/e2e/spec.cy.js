describe('My First Test', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit('https://source.thenbs.com/')
    cy.get('#onetrust-accept-btn-handler')
     .click()

    cy.get('[data-cy="searchFieldSearch"]')
      .first()
      .click()
      .type('Dyson')

    cy.contains('Dyson')
      .click()

    // Should be on a new URL which
    // includes '/commands/actions'
    cy.url().should('include', '/commands/actions')

    cy.get('a[action="telephone"]').should('exist'); // Assert that the link exists
    cy.get('a[action="telephone"]').click(); // Click on the link

    //  Verify that the 'h1' element contains the correct title
    cy.get("h1").should('have.text', 'Dyson')

    // Same as above
    cy.get("h1").contains('Actions')
  })
})