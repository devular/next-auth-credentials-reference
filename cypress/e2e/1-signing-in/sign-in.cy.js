/// <reference types="cypress" />

describe('Signing in to the reference app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Display a nav link to the sign in page', () => {
    cy.get('[data-cy="sign-in-list-item"]').should('have.length', 1);
  });

  it('Navigates to the sign in page', () => {
    cy.get('[data-cy="sign-in-list-item"]').click();
    cy.url().should('include', '/sign-in');
  });

  it('Displays a sign in form', () => {
    cy.get('[data-cy="sign-in-list-item"]').click();
    cy.get('[data-cy="sign-in-form"]').should('have.length', 1);
  });

  it('Signs in and sets cookie', () => {
    cy.get('[data-cy="sign-in-list-item"]').click();
    cy.url().should('include', '/sign-in');
    cy.get('input[name="email"]').type('test-user@test.com');
    cy.get('input[name="password"]').type('testtesttest');
    cy.get('button[type="submit"').click();
    cy.url().should('include', '/app/dashboard');
    cy.getCookie('next-auth.session-token').should('exist');
  });
});
