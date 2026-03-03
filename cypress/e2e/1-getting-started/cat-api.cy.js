describe('The Cat API - Breeds', () => {

  const API_URL = 'https://api.thecatapi.com/v1';
  const BEARER_TOKEN = Cypress.env('CAT_API_KEY');

  it('should validate the bearer token before fetching breeds', () => {
    // First, validate the token by hitting an auth-required endpoint (/favourites)
    // This endpoint returns 401 if the token is missing or invalid
    cy.request({
      method: 'GET',
      url: `${API_URL}/favourites`,
      headers: {
        'x-api-key': BEARER_TOKEN,
      },
      failOnStatusCode: false, // Don't let Cypress auto-fail, we want to assert ourselves
    }).then((authResponse) => {
      // Assert the token is valid (401 = invalid/missing key)
      expect(authResponse.status, 'Bearer token must be valid').to.eq(200);

      // Now fetch the breeds using the validated token
      cy.request({
        method: 'GET',
        url: `${API_URL}/breeds`,
        headers: {
          'x-api-key': BEARER_TOKEN,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);

        // Log each breed to the console
        cy.log(`Total breeds found: ${response.body.length}`);

        response.body.forEach((breed) => {
          cy.log(`Breed: ${breed.name} | Temperament: ${breed.temperament || 'N/A'}`);
        });
      });
    });
  });

});
