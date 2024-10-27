class BasePage {

    // Define selectors
    elements = {
        sourceLogo: () => cy.get('a.brand-primary.wrapper')
      };
      
    constructor(basePage) {
      this.basePage = basePage;
    }

    clickSourceLogo() {
        this.elements.sourceLogo()
        .click()

    }

    // greet() {
    //   return `Hello, ${this.name}!`;
    // }
  }
  
  export default BasePage;