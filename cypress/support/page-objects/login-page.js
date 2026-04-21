/// <reference types="cypress" />

class LoginPage {
  static selectors = {
    emailField: "#Identification_Email",
    passwordField: "#Authentication_Password",
    nextText: "Next",
    signInText: "Sign in",
  };

  static timeout = 10000;
}

module.exports = LoginPage;
