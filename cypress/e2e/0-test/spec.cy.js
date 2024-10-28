import HomePage from '../../support/page-objects/homepage';
import BasePage from '../../support/page-objects/base-page';
import ManufacturerHomePage from '../../support/page-objects/manufacturer-homepage';

describe('Dyson Homepage Tests', () => {
  const baseURL = 'https://source.thenbs.com/';
  const basePage = new BasePage(baseURL);

  beforeEach(() => {
    basePage.visit();                // Visit the base URL
    HomePage.acceptCookies();        // Accept cookies
    HomePage.enterSearchTerm('Dyson'); // Enter search term
  });

  it('Verify URL contains expected text', () => {
    basePage.verifyUrlContents('/manufacturer/dyson');
  });

  it('Verify the telephone link attribute', () => {  
    // Ensure the element exists, verify the href attribute and Tel protocol 
    ManufacturerHomePage.verifyTelephoneLinkAttribute('tel:08003457788');
  });

  it('Verify the h1 title text on page', () => {
    basePage.verifyH1Text('Dyson');
  });

  it('Verify the Source Logo', () => {
    basePage.clickSourceLogo();
    basePage.verifyH1Text('NBS SourceFind, select and specify');
  });
});
