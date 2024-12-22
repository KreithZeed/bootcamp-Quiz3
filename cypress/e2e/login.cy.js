/// <reference types="cypress" />

describe('Login Feature', () => {
    it('User Login with Valid Credentials', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      cy.contains('Login').should('be.visible');
      cy.get('[name="username"]').type('Admin');
      cy.get('[name="password"]').type('admin123');
      cy.get('button[type="submit"]').click();
      cy.contains('Dashboard').should('be.visible');
    });
  
    it('User Login with Invalid Username', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      cy.get('[name="username"]').type('InvalidUser');
      cy.get('[name="password"]').type('admin123');
      cy.get('button[type="submit"]').click();
      cy.contains('Invalid credentials').should('be.visible');
    });
  
    it('User Login with Invalid Password', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      cy.get('[name="username"]').type('Admin');
      cy.get('[name="password"]').type('admin12e');
      cy.get('button[type="submit"]').click();
      cy.contains('Invalid credentials').should('be.visible');
    });

    it('User Login with Blank Username and Password', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      cy.get('[name="username"]').should('be.empty');
      cy.get('[name="password"]').should('be.empty');
      cy.get('button[type="submit"]').click();
      cy.contains('Required').should('be.visible');
    });

    it('User Login with Invalid Username and Password', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      cy.get('[name="username"]').type('ADMIN');
      cy.get('[name="password"]').type('ADMIN123');
      cy.get('button[type="submit"]').click();
      cy.contains('Invalid credentials').should('be.visible');
    });

    it('User Forgot Password', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      cy.contains('Forgot your password').should('be.visible').click();
      cy.contains('Reset Password').should('be.visible');
    });
  }); 