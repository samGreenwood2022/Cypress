// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import "cypress-axe";

Cypress.Commands.add('setSurveyDismissFlags', (pollId = '1657266') => {
    const done = `${pollId}%2C${pollId}`;
    cy.window({ log: false }).then((win) => {
        try {
            win.localStorage.setItem('_hjMinimizedPolls', pollId);
            win.localStorage.setItem('_hjDonePolls', done);
        } catch (e) {
            // Surface a clear error if localStorage is not accessible
            throw new Error(`Failed to set survey flags in localStorage: ${e?.message || e}`);
        }
    });
});

// An example of a custom command to log in a user using cy.origin for cross-origin handling
Cypress.Commands.add('loginUser', () => {
    // store the current URL to compare after login
    cy.url().as('currentUrl');

    // Initiate sign in from the source domain
    cy.contains('button', 'Sign in', { timeout: 10000 }).click();

    // Perform cross-origin login steps
    cy.origin('https://login.thenbs.com', () => {
        cy.get('#Identification_Email').type('sam_greenwood26@hotmail.com');
        cy.contains('Next', { timeout: 10000 }).click();
        cy.get('#Authentication_Password').type('Felix1976');
        cy.contains('button', 'Sign in', { timeout: 10000 }).click();
    });

    // Simple post-login assertion (adjust as needed for your app)
    cy.get('@currentUrl').then((currentUrl) => {
        cy.url().should('include', currentUrl);
    });
});
