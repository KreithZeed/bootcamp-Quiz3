/// <reference types="cypress" />

describe('Sample Test', () => {
    it('Visits the OrangeHRM Demo Page', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });
  });
  