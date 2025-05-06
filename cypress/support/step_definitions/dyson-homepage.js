/// <reference types="cypress" />

// Import page objects
const HomePage = require("../page-objects/homepage");
const ManufacturerHomePage = require("../page-objects/manufacturer-homepage");
const BasePage = require("../page-objects/base-page");

// Import Cucumber preprocessor functions
var { Given, Then, Before } = require("@badeball/cypress-cucumber-preprocessor");

// Define base URL and initialize page objects


const basePage = new BasePage();
const manufacturerHomePage = new ManufacturerHomePage();

// Define email and password variables
const email = "sam_greenwood26@hotmail.com";
const password = "Felix1976";

// Before hook to set email and password before each scenario
Before(() => {
  basePage.setEmail(email); // Set the email
  basePage.setPassword(password); // Set the password
});

// Given step to sign into NBS and visit the manufacturer home page
Given(`I sign into NBS and visit the manufacturer home page`, () => {
  basePage.visit(); // Visit the base URL
  basePage.signIn(); // Sign in
  HomePage.acceptCookies(); // Accept cookies
  HomePage.enterSearchTerm("Dyson"); // Enter search term
});

// Then step to verify the URL contains the expected text
Then(`The URL will contain the expected text {string}`, (expectedText) => {
  cy.url().should("include", expectedText); // Verify the URL contains the expected text
});

// Then step to verify the telephone link attribute
Then(
  `The number will be correct, the href will be as expected, and the telephone protocol will correct {string}`,
  (telNo) => {
    manufacturerHomePage.verifyTelephoneLinkAttribute(telNo); // Verify the telephone link attribute
  }
);

// Then step to verify the h1 title text
Then(`The h1 title text will be as expected {string}`, (h1Text) => {
  manufacturerHomePage.verifyH1Text(h1Text); // Verify the h1 title text
});

// Then step to verify the href attribute of the Source logo
Then(`The href attribute of the Source logo will be as expected {string}`, (href) => {
  basePage.verifyLinkHref(href); // Verify the href attribute of the Source logo
});

// Then step to verify the manufacturer website link
Then(`The manufacturer website link is correct {string}`, (url) => {
  manufacturerHomePage.verifyManufacturerWebLink(url); // Verify the manufacturer website link
});

// Then step to verify the contact manufacturer button text
Then(`The button will display the correct text {string}`, (btnTxt) => {
  manufacturerHomePage.verifyContactManufacturerBtnTxt(btnTxt); // Verify the contact manufacturer button text
});

// Then step to check the page accessibility using AXE
// The results of the accessibility checks will be output to the browser's console
// You can also click the A11y failures in the Cypress runner (there will be 8, but the test is set to not fail),
// which will then highlight the element and output a summary of the failure in the console
Then(`The results of the accessibility checks will be output to the console`, () => {
  cy.injectAxe(); // Inject the AXE script into the page
  cy.checkA11y(null, null, (violations) => {
    // Log the violations without failing the test
    cy.task('log', violations);
    violations.forEach((violation) => {
      const nodes = Cypress.$(
        violation.nodes.map((node) => node.target).join(',')
      );
      Cypress.log({
        name: 'a11y error!',
        consoleProps: () => violation,
        $el: nodes,
        message: `[${violation.id}] ${violation.help} (${violation.nodes.length} nodes)`,
      });
    });
  }, { timeout: 10000 }); // Increase the timeout to 10 seconds
});

// Then step definition for the API test
Then(`I should get a 200 response and output request to the console`, () => {
  cy.request("https://jsonplaceholder.cypress.io/comments") // Example endpoint
    .then((response) => {
      // Log the full body of the response
      cy.log(JSON.stringify(response.body));
      // Assert the status code
      expect(response.status).to.equal(200);
      // Store the response body in an alias
      cy.wrap(response.body).as('apiResponse');
    });
});

// Then step definition to check the response contains the expected email address
Then(`The response should contain the expected email address {string}`, (expectedEmail) => {
  // Retrieve the response body from the alias
  cy.get('@apiResponse').then((body) => {
    // Assert that the response body contains the expected email address
    const emails = body.map((comment) => comment.email);
    expect(emails).to.include(expectedEmail);
  });
});

// Then step definition to verify the Dyson image attributes
Then(`The Dyson logo image should exist and have the correct attributes`, () => {
  manufacturerHomePage.verifyDysonImageAttributes(); // Verify the Dyson image attributes
});

// Then step definition to verify the Dyson navigation bar tabs
Then(`The Dyson navigation bar should have the correct tabs and href links`, () => {
  manufacturerHomePage.verifyTabs(); // Verify the Dyson image attributes
});