const HomePage = require("../page-objects/homepage");
const BasePage = require("../page-objects/base-page");
const ManufacturerHomePage = require("../page-objects/manufacturer-homepage");

var { Given, Then, Before } = require('@badeball/cypress-cucumber-preprocessor');

const baseURL = "https://login.thenbs.com/auth/login";
const basePage = new BasePage(baseURL);
const manufacturerHomePage = new ManufacturerHomePage();

const email = 'sam_greenwood26@hotmail.com'; // Define the email variable
const password = 'Felix1976'; // Define the password variable

Before(() => {
  basePage.setEmail(email); // Set the email
  basePage.setPassword(password); // Set the password
});

beforeEach(() => {
  basePage.visit(); // Visit the base URL
  // HomePage.acceptCookies(); // Accept cookies
  // HomePage.enterSearchTerm("Dyson"); // Enter search term
});

Given(`I visit the manufacturer home page`, () => {
  // manufacturerHomePage.verifyH1Text('Dyson');
});

Then(`The URL will contain the expected text {string}`, (expectedText) => {
  cy.url().should('include', expectedText);
});

Then(`The URL will contain the expected text1 {string}`, () => {
  basePage.signIn();
});

Then(`The number will be correct, the href will be as expected, and the telephone protocol will correct {string}`, (telNo) => {
  manufacturerHomePage.verifyTelephoneLinkAttribute(telNo);
});

Then(`The h1 title text will be as expected {string}`, (h1Text) => {
  manufacturerHomePage.verifyH1Text(h1Text);
});

Then(`The href attribute of the Source logo will be as expected {string}`, (href) => {
  basePage.verifyLinkHref(href);
});

Then(`The manufacturer website link is correct {string}`, (url) => {
  manufacturerHomePage.verifyManufacturerWebLink(url);
  basePage.signIn();
});

Then(`The button will display the correct text {string}`, (btnTxt) => {
  manufacturerHomePage.verifyContactManufacturerBtnTxt(btnTxt);
});

Then(`I click the link and it opens in the same window`, () => {
  // Intercept the link click and modify its behavior
  cy.get('a[target="_blank"]').invoke('removeAttr', 'target').click();
});