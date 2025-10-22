describe('Login Test', () => {
  it('should test login functionality', () => {
    cy.visit('https://source.thenbs.com')
    // Studio can extend from here
    cy.prompt([
    "Click the 'Accept All Cookies' button",
      "Type 'Dyson' into the search field and press Enter",
      "Click the 'Manufacturer' tab",
      "Select the 'Dyson' manufacturer tile",
      "Verify we are on the correct URL 'https://source.thenbs.com/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview'"
    ])
  })
})