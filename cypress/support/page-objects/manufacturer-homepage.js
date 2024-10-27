import HomePage from "./base-page";

class ManufacturerHomePage extends HomePage {
    // Define selectors
    elements = {
      telephoneLink: () => cy.get('a[action="telephone"]')
    };

    verifyTelephoneLinkAttribute(){
        this.elements.telephoneLink().should('exist') // Ensure the element exists
            .and('have.attr', 'href', 'tel:08003457788') // Verify the href attribute and Tel protocol
            .and('have.attr', 'title', 'Call 08003457788'); // Optionally verify the title attribute

    }


}
  
  export default new ManufacturerHomePage();