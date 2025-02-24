describe('Employee Overview Page', () => {
  beforeEach(() => {
    cy.visit('/employee');
  });

  it('should load the page and display employees', () => {
    cy.get('h1').contains('Employees Overview');
    cy.get('table').should('be.visible');
    cy.get('table tbody tr').should('have.length', 5); // Assuming 5 rows per page
  });

  it('should filter employees by first name', () => {
    cy.get('input[name="first_name"]').type('John');
    cy.get('button').contains('Search').click();
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).contains('John');
    });
  });

  it('should filter employees by last name', () => {
    cy.get('input[name="last_name"]').type('Doe');
    cy.get('button').contains('Search').click();
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).contains('Doe');
    });
  });

  it('should filter employees by email', () => {
    cy.get('input[name="email"]').type('example.com');
    cy.get('button').contains('Search').click();
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).contains('example.com');
    });
  });

  it('should filter employees by position', () => {
    cy.get('input[name="position"]').type('Engineer');
    cy.get('button').contains('Search').click();
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).contains('Engineer');
    });
  });

  it('should paginate through employees', () => {
    cy.get('button').contains('Next').then(($nextButton) => {
      if ($nextButton.is(':enabled')) {
        cy.get('button').contains('Next').click();
        cy.get('table tbody tr').should('have.length', 5);
      } else {
        cy.get('table tbody tr').should('have.length.lte', 5);
      }
    });
  });

  it('should navigate using breadcrumbs', () => {
    cy.get('a').contains('Home').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    cy.get('a').contains('Employees').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/employee`);
  });

  it('should display an error message on network error', () => {
    cy.intercept('GET', '/employee', { forceNetworkError: true }).as('getEmployees');
    cy.visit('/employee');
    cy.wait('@getEmployees');
    cy.get('.text-red-500').should('be.visible').and('contain', 'Failed to fetch employees');
  });

  it('should display a loading spinner while fetching employees', () => {
    cy.intercept('GET', '/employee', (req) => {
      req.on('response', (res) => {
        res.setDelay(1000);
      });
    }).as('getEmployees');
    cy.visit('/employee');
    cy.get('.animate-spin').should('be.visible');
    cy.wait('@getEmployees');
    cy.get('.animate-spin').should('not.exist');
  });
});