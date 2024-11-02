import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I visit the home page', () => {
  cy.visit('https://example.com'); // Change to your URL
});

Then('I should see the welcome message', () => {
  cy.contains('Welcome'); // Adjust based on your page content
});
