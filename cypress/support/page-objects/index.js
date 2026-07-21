/// <reference types="cypress" />

// Single place where page objects are created, so step definitions can just do:
//   const { homePage } = require("../page-objects");
//
// Sharing one instance per page is safe because page objects hold no test
// state - only selectors and methods. If one ever needs to remember something
// between steps, create it per file instead.
const BasePage = require("./base-page");
const HomePage = require("./homepage");
const ManufacturerHomePage = require("./manufacturer-homepage");
const LoginPage = require("./login-page");

module.exports = {
  basePage: new BasePage(),
  homePage: new HomePage(),
  manufacturerHomePage: new ManufacturerHomePage(),

  // LoginPage is used via its static selectors, so export the class itself
  LoginPage,
};
