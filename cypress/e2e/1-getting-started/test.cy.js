describe('Dyson Manufacturer Page - NBS BIM Library', () => {
  const baseUrl = 'https://source.thenbs.com/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview'
  
  beforeEach(() => {
    // Visit the page before each test
    cy.visit(baseUrl)
    
    // Wait for page to load completely
    cy.get('body').should('be.visible')
  })

  describe('Page Loading and Basic Structure', () => {
    it('should load the page successfully', () => {
      cy.url().should('include', '/manufacturer/dyson/')
      cy.title().should('contain', 'Dyson')
      cy.title().should('contain', 'NBS BIM Library')
    })

    it('should have proper meta tags and SEO elements', () => {
      cy.document().should('have.property', 'title')
      cy.get('head meta[name="description"]').should('exist')
      cy.get('head meta[property="og:title"]').should('exist')
    })

    it('should display the main navigation', () => {
      cy.get('nav').should('be.visible')
      cy.get('header').should('be.visible')
    })

    it('should have accessible content', () => {
      cy.get('main').should('exist')
      cy.get('h1, h2, h3').should('have.length.greaterThan', 0)
    })
  })

  describe('Dyson Brand Content', () => {
    it('should display Dyson branding and logo', () => {
      cy.contains('Dyson').should('be.visible')
      cy.get('img[alt*="Dyson"], img[src*="dyson"]').should('exist')
    })

    it('should show manufacturer overview content', () => {
      cy.contains('Technology for business').should('be.visible')
      cy.contains('Quiet Mark Certification').should('be.visible')
    })

    it('should display company description', () => {
      cy.contains('solving problems and relentlessly innovating').should('be.visible')
      cy.contains('set new standards for performance').should('be.visible')
    })
  })

  describe('Product Listings', () => {
    it('should display Dyson Airblade products', () => {
      cy.contains('Dyson Airblade™ 9kJ Hand Dryer').should('be.visible')
      cy.contains('Dyson Airblade™ Wash+Dry Tap Hand Dryer').should('be.visible')
      cy.contains('Dyson Airblade™ V Hand Dryer').should('be.visible')
    })

    it('should show product model numbers', () => {
      cy.contains('HU03').should('be.visible')
      cy.contains('WD04').should('be.visible')
      cy.contains('HU02').should('be.visible')
    })

    it('should display Dyson Solarcycle product', () => {
      cy.contains('Dyson Solarcycle™').should('be.visible')
    })

    it('should have clickable product links', () => {
      cy.contains('Dyson Airblade™ 9kJ Hand Dryer').should('be.visible').click({ force: true })
      // Navigate back for other tests
      cy.go('back')
    })
  })

  describe('Case Studies and References', () => {
    it('should display case studies section', () => {
      cy.contains('The London Eye').should('be.visible')
      cy.contains('Queen Mary, University of London').should('be.visible')
    })

    it('should show partnership information', () => {
      cy.contains('Dyson and Welcome Break partner').should('be.visible')
      cy.contains('motorway service washrooms').should('be.visible')
    })

    it('should display hospitality case study reference', () => {
      cy.contains('Rosewood Hotel').should('be.visible')
      cy.contains('Dyson for Hospitality').should('be.visible')
    })
  })

  describe('Technical Documentation', () => {
    it('should display technical specification links', () => {
      cy.contains('Technical Specification').should('be.visible')
      cy.contains('Operations Manual').should('be.visible')
    })

    it('should show technology brochure', () => {
      cy.contains('Dyson Technology for Business Brochure').should('be.visible')
      cy.contains('commercial spaces').should('be.visible')
    })

    it('should have downloadable resources', () => {
      cy.get('a[href*=".pdf"], a[download]').should('have.length.greaterThan', 0)
    })
  })

  describe('Images and Media', () => {
    it('should load product images successfully', () => {
      cy.get('img').should('have.length.greaterThan', 0)
      cy.get('img').each(($img) => {
        cy.wrap($img).should('be.visible')
        cy.wrap($img).should('have.attr', 'src').and('not.be.empty')
      })
    })

    it('should have proper alt text for images', () => {
      cy.get('img').each(($img) => {
        cy.wrap($img).should('have.attr', 'alt')
      })
    })

    it('should display certification images', () => {
      cy.get('img[alt*="Quiet Mark"], img[src*="quiet-mark"]').should('exist')
    })
  })

  describe('Navigation and User Experience', () => {
    it('should have working breadcrumb navigation', () => {
      cy.get('nav[aria-label="breadcrumb"], .breadcrumb').should('exist')
    })

    it('should allow navigation between tabs/sections', () => {
      cy.get('a[href*="overview"]').should('have.class', 'active').or('have.attr', 'aria-current')
      
      // Check if other tabs exist
      cy.get('a[href*="products"], a[href*="specifications"], a[href*="resources"]').then(($tabs) => {
        if ($tabs.length > 0) {
          cy.wrap($tabs).first().click()
          cy.url().should('not.include', 'overview')
        }
      })
    })

    it('should have search functionality', () => {
      cy.get('input[type="search"], input[placeholder*="search"]').should('exist')
    })
  })

  describe('Responsive Design', () => {
    it('should be responsive on mobile devices', () => {
      cy.viewport('iphone-x')
      cy.get('body').should('be.visible')
      cy.contains('Dyson').should('be.visible')
    })

    it('should be responsive on tablet devices', () => {
      cy.viewport('ipad-2')
      cy.get('body').should('be.visible')
      cy.contains('Dyson').should('be.visible')
    })

    it('should work on desktop', () => {
      cy.viewport(1920, 1080)
      cy.get('body').should('be.visible')
      cy.contains('Dyson').should('be.visible')
    })
  })

  describe('Performance and Loading', () => {
    it('should load within acceptable time', () => {
      const start = Date.now()
      cy.visit(baseUrl)
      cy.get('body').should('be.visible').then(() => {
        const loadTime = Date.now() - start
        expect(loadTime).to.be.lessThan(10000) // 10 seconds max
      })
    })

    it('should not have JavaScript errors', () => {
      cy.window().then((win) => {
        cy.stub(win.console, 'error').as('consoleError')
      })
      cy.get('@consoleError').should('not.have.been.called')
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      cy.get('h1').should('have.length', 1)
      cy.get('h1, h2, h3, h4, h5, h6').should('have.length.greaterThan', 1)
    })

    it('should have focusable elements', () => {
      cy.get('a, button, input, select, textarea').should('have.length.greaterThan', 0)
    })

    it('should support keyboard navigation', () => {
      cy.get('body').type('{tab}')
      cy.focused().should('exist')
    })

    it('should have ARIA labels where needed', () => {
      cy.get('[aria-label], [aria-labelledby], [role]').should('exist')
    })
  })

  describe('Links and External Resources', () => {
    it('should have valid internal links', () => {
      cy.get('a[href^="/"]').each(($link) => {
        const href = $link.attr('href')
        cy.request({ url: Cypress.config().baseUrl + href, failOnStatusCode: false })
          .its('status').should('be.oneOf', [200, 301, 302])
      })
    })

    it('should handle external links properly', () => {
      cy.get('a[href^="http"]:not([href*="thenbs.com"])').should('have.attr', 'target', '_blank')
    })

    it('should have working contact or support links', () => {
      cy.get('a[href*="contact"], a[href*="support"], a[href*="help"]').should('exist')
    })
  })

  describe('Search Engine Optimization', () => {
    it('should have proper structured data', () => {
      cy.get('script[type="application/ld+json"]').should('exist')
    })

    it('should have canonical URL', () => {
      cy.get('link[rel="canonical"]').should('exist')
    })

    it('should have appropriate meta tags', () => {
      cy.get('meta[name="keywords"]').should('exist')
      cy.get('meta[name="author"]').should('exist')
    })
  })

  describe('Form Interactions', () => {
    it('should handle newsletter signup if present', () => {
      cy.get('form').then(($forms) => {
        if ($forms.length > 0) {
          cy.get('input[type="email"]').should('exist')
          cy.get('button[type="submit"], input[type="submit"]').should('exist')
        }
      })
    })

    it('should validate form inputs', () => {
      cy.get('input[required]').then(($inputs) => {
        if ($inputs.length > 0) {
          cy.wrap($inputs).first().focus().blur()
          // Check for validation messages
          cy.get('.error, .invalid, [aria-invalid="true"]').should('exist')
        }
      })
    })
  })

  describe('Content Quality', () => {
    it('should not have broken content or placeholder text', () => {
      cy.contains('Lorem ipsum').should('not.exist')
      cy.contains('TODO').should('not.exist')
      cy.contains('PLACEHOLDER').should('not.exist')
    })

    it('should have meaningful content lengths', () => {
      cy.get('p').each(($p) => {
        cy.wrap($p).invoke('text').should('have.length.greaterThan', 10)
      })
    })
  })

  describe('Error Handling', () => {
    it('should handle 404 errors gracefully', () => {
      cy.visit('/manufacturer/dyson/nonexistent-page', { failOnStatusCode: false })
      cy.get('body').should('contain', '404').or('contain', 'Not Found')
    })

    it('should recover from network issues', () => {
      cy.intercept('GET', '**/*.css', { statusCode: 500 }).as('cssFailure')
      cy.visit(baseUrl)
      cy.get('body').should('be.visible') // Should still render basic content
    })
  })
})