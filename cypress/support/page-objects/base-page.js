class BasePage {

    // Define selectors
    elements = {
        sourceLogo: () => cy.get('a.brand-primary.wrapper')
      };
      
    constructor(baseURL) {
      this.baseURL = baseURL;
    }

    visit() {
        cy.visit(this.baseURL);  // Use baseURL to visit the page
    };

    clickSourceLogo() {
        this.elements.sourceLogo()
        .click()

    };

    // greet() {
    //   return `Hello, ${this.name}!`;
    // }
  };
  
  export default BasePage;