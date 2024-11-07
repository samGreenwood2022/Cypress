const { Given, Then } = require("@badeball/cypress-cucumber-preprocessor");

Given("I visit the home page", () => {
  cy.visit("https://example.com");
});

Then("I should see the welcome message", () => {
  cy.contains("Example Domain");
  debugger;
});
