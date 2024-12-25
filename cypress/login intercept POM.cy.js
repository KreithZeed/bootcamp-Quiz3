/// <reference types="cypress" />
import loginPage from "../pom/OrangeHRM/Login/Login";
import resetPassword from "../pom/OrangeHRM/Reset";

describe('Login Feature', () => {
    it('User Login with Valid Credentials', () => {
      cy.intercept('POST', '/api/v1/auth/login').as('loginRequest');
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      loginPage.textLogin().should('have.text', 'Login');
      loginPage.inputUsername().type('Admin');
      loginPage.inputPassword().type('admin123');
      cy.intercept("GET","**/employees/action-summary").as("actionSummary");
      loginPage.buttonLogin().click();
      cy.wait('@actionSummary').its('response.statusCode').should('eq', 200);
      loginPage.menuDashboard().should('have.text', 'Dashboard');
    });
  
   it('User Login with Invalid Username', () => {
    cy.intercept('POST', '/api/v1/auth/login').as('loginRequest');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    loginPage.textLogin().should('have.text', 'Login');
    loginPage.inputUsername().type('InvalidUser');
    loginPage.inputPassword().type('admin123');
    loginPage.buttonLogin().click();
    cy.contains('Invalid credentials').should('be.visible');
  });

  it('User Login with Invalid Password', () => {
    cy.intercept('POST', '/api/v1/auth/login').as('loginRequest');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    loginPage.textLogin().should('have.text', 'Login');
    loginPage.inputUsername().type('Admin');
    loginPage.inputPassword().type('admin12e');
    loginPage.buttonLogin().click();
    cy.contains('Invalid credentials').should('be.visible');
  });

  it('User Login with Blank Username and Password', () => {
    cy.intercept('POST', '/api/v1/auth/login').as('loginRequest');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    loginPage.textLogin().should('have.text', 'Login');
    loginPage.inputUsername().should('be.empty');
    loginPage.inputPassword().should('be.empty');
    loginPage.buttonLogin().click();
    cy.contains('Required').should('be.visible');
  });

  it('User Login with Invalid Username and Password', () => {
    cy.intercept('POST', '/api/v1/auth/login').as('loginRequest');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    loginPage.textLogin().should('have.text', 'Login');
    loginPage.inputUsername().type('ADMIN');
    loginPage.inputPassword().type('ADMIN123');
    loginPage.buttonLogin().click();
    cy.contains('Invalid credentials').should('be.visible');
  });

  it('User Forgot Password', () => {
      cy.intercept('POST', '/api/v1/auth/requestResetPassword').as('forgotPasswordRequest');
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      loginPage.textLogin().should('have.text', 'Login');
      resetPassword.forgotButton().click();
      resetPassword.textReset().type('Admin'); 
      resetPassword.resetButton().click();
      cy.contains('Reset Password link sent successfully').should('be.visible'); 
  });
}); 