import BasePage from "./base-page";

class ManufacturerHomePage extends BasePage {
    // Define selectors on the manufacturer homepage
    elements = {
      telephoneLink: () => cy.get('a[action="telephone"]'),
      favouritesIcon: () => cy.get('[data-cy="copyPermalinkButton"]'),
    };

    verifyTelephoneLinkAttribute(telNo){
        this.elements.telephoneLink().should('exist') // Ensure the element exists
            .and('have.attr', 'href', telNo) // Verify the href attribute and Tel protocol
    }




}
  
  export default new ManufacturerHomePage();