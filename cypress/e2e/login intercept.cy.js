/// <reference types="cypress" />

describe('Login Feature', () => {
    it('User Login with Valid Credentials', () => {
      cy.intercept('POST', '/api/v1/auth/login').as('loginRequest');
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text', 'Login');
      cy.get('[name="username"]').type('Admin');
      cy.get('[name="password"]').type('admin123');
      cy.intercept("GET","**/employees/action-summary").as("actionSummary");
      cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
      cy.wait('@actionSummary').its('response.statusCode').should('eq', 200);
      cy.get('[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]').should('have.text', 'Dashboard');
    });
  
   it('User Login with Invalid Username', () => {
    cy.intercept('POST', '/api/v1/auth/login').as('loginRequest');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('[name="username"]').type('InvalidUser');
    cy.get('[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid credentials').should('be.visible');
  });

  it('User Login with Invalid Password', () => {
    cy.intercept('POST', '/api/v1/auth/login').as('loginRequest');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('[name="username"]').type('Admin');
    cy.get('[name="password"]').type('admin12e');
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid credentials').should('be.visible');
  });

  it('User Login with Blank Username and Password', () => {
    cy.intercept('POST', '/api/v1/auth/login').as('loginRequest');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('[name="username"]').should('be.empty');
    cy.get('[name="password"]').should('be.empty');
    cy.get('button[type="submit"]').click();
    cy.contains('Required').should('be.visible');
  });

  it('User Login with Invalid Username and Password', () => {
    cy.intercept('POST', '/api/v1/auth/login').as('loginRequest');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('[name="username"]').type('ADMIN');
    cy.get('[name="password"]').type('ADMIN123');
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid credentials').should('be.visible');
  });

  it('User  Forgot Password', () => {
      cy.intercept('POST', '/api/v1/auth/requestResetPassword').as('forgotPasswordRequest');
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      cy.contains('Forgot your password').should('be.visible').click();
      cy.get('[name="username"]').type('Admin'); 
      cy.get('button[type="submit"]').click();
      cy.contains('Reset Password link sent successfully').should('be.visible'); 
  });
}); 