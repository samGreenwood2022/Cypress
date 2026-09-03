describe('New features', () => {
  it('should test login functionality', () => {
    cy.visit('https://source.thenbs.com')
    cy.get('#onetrust-accept-btn-handler').click();
  })
})