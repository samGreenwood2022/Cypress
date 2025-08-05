describe('mock-api', () => {
  it('debug - check if mock is called', () => {
    cy.viewport(1280, 900);
    cy.clearLocalStorage();
    cy.clearCookies();
    
    // Intercept ALL network requests to see what's happening
    cy.intercept('**/*').as('allRequests');
    
    cy.intercept(
      "GET",
      "https://geolocation.onetrust.com/cookieconsentpub/v1/geo/location",
      {
        statusCode: 200,
        body: {
          country: "AU",
          state: "AUS",
          stateName: "Australia",
          continent: "AU",
        },
      }
    ).as("mockGeoLocation");

    cy.visit("https://source.thenbs.com");
    
    // Wait a bit for page to load
    cy.wait(3000);
    
    // Check if our mock was ever called
    cy.get('@mockGeoLocation.all').then((calls) => {
      console.log('Mock geo calls:', calls.length);
      if (calls.length > 0) {
        console.log('Mock was called:', calls[0].response.body);
      } else {
        console.log('Mock was NEVER called - API might be cached or different URL');
      }
    });
    
    // Check ALL requests to find geo-related ones
    cy.get('@allRequests.all').then((requests) => {
      const geoRequests = requests.filter(req => 
        req.request.url.includes('geo') || 
        req.request.url.includes('location') ||
        req.request.url.includes('onetrust')
      );
      console.log('All geo-related requests:', geoRequests.map(r => r.request.url));
    });
  });
});