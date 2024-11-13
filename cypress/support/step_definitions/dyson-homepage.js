const HomePage = require("../../support/page-objects/homepage");
const BasePage = require("../../support/page-objects/base-page");
const ManufacturerHomePage = require("../../support/page-objects/manufacturer-homepage");
const { verifyH1Text, verifyUrlContents } = require('../page-objects/manufacturer-homepage');

var { Given, Then } = require('@badeball/cypress-cucumber-preprocessor');


const baseURL = "https://source.thenbs.com/";
const basePage = new BasePage(baseURL);


beforeEach(() => {
    basePage.visit(); // Visit the base URL
    HomePage.acceptCookies(); // Accept cookies
    HomePage.enterSearchTerm("Dyson"); // Enter search term
  })

Given(`I visit the manufacturer home page`, () => {
    verifyH1Text('Dyson')
});

Then('The URL will contain the expected text {string}', (expectedText) => {
    cy.url().should('include', expectedText);
  });

Given(`I click the telephone number link`, (hrefText) => {
    ManufacturerHomePage.verifyLinkHref(hrefText)
});

Then('The number will be correct and the href will be as expected {string}', (telNo) => {
    ManufacturerHomePage.verifyTelephoneLinkAttribute(telNo)
  });