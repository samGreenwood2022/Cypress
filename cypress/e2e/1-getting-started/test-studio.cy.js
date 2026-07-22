describe('Login Test', () => {
  it('should test login functionality', () => {
    cy.visit('https://source.thenbs.com/en/gb')
    // Studio can extend from here
    cy.prompt([
    "Close the initial popup if it exists",  
    "Click the 'Accept All Cookies' button if it exists",
      "Type 'Dyson' into the search field and press Enter",
      "Click the 'Manufacturer' tab",
      "Select the 'Dyson' manufacturer tile",
      "Verify we are on the correct URL 'https://source.thenbs.com/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview'"
    ])
  })
})