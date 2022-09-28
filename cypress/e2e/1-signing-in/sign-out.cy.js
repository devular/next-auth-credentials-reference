/// <reference types="cypress" />

// Welcome to Cypress!

describe('Signing out clears cookies', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Signs in and sets cookie', () => {
    cy.get('[data-cy="sign-in-list-item"]').click();
    cy.url().should('include', '/sign-in');
    cy.get('input[name="email"]').type('test@test.com');
    cy.get('input[name="password"]').type('testtest');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/app/dashboard');
    cy.getCookie('next-auth.session-token').should('exist');
    cy.get('[data-cy="sign-out-list-item"] a').click();
    cy.url().should('not.include', '/app/dashboard');
    cy.getCookie('next-auth.session-token').should('not.exist');
  });
});
