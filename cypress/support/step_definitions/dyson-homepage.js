const HomePage = require("../page-objects/homepage");
const BasePage = require("../page-objects/base-page");
const ManufacturerHomePage = require("../page-objects/manufacturer-homepage");

var { Given, Then } = require('@badeball/cypress-cucumber-preprocessor');

const baseURL = "https://source.thenbs.com/";
const basePage = new BasePage(baseURL);
const manufacturerHomePage = new ManufacturerHomePage();

beforeEach(() => {
  basePage.visit(); // Visit the base URL
  HomePage.acceptCookies(); // Accept cookies
  HomePage.enterSearchTerm("Dyson"); // Enter search term
});

Given(`I visit the manufacturer home page`, () => {
  manufacturerHomePage.verifyH1Text('Dyson');
});

Then(`The URL will contain the expected text {string}`, (expectedText) => {
  cy.url().should('include', expectedText);
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
});

Then(`The button will display the correct text {string}`, (btnTxt) => {
  manufacturerHomePage.verifyContactManufacturerBtnTxt(btnTxt);
});