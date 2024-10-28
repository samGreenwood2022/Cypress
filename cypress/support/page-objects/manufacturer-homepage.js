import HomePage from "./base-page";

class ManufacturerHomePage extends HomePage {
    // Define selectors
    elements = {
      telephoneLink: () => cy.get('a[action="telephone"]'),
      favouritesIcon: () => cy.get('mat-icon[title="Select item"]'),
    };

    verifyTelephoneLinkAttribute(telNo){
        this.elements.telephoneLink().should('exist') // Ensure the element exists
            .and('have.attr', 'href', telNo) // Verify the href attribute and Tel protocol
    }

    


}
  
  export default new ManufacturerHomePage();