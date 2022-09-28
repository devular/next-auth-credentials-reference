/// <reference types="cypress" />

// Welcome to Cypress!

describe('Accessing protected routes', () => {
  it('Should not be able to access a route protected with getServerSideProps', () => {
    cy.visit('http://localhost:3000/protected-route');
    cy.url().should('include', '/401');
  });

  it('Should not be able to access a route protected with NextAuth middleware', () => {
    cy.visit('http://localhost:3000/app/dashboard');
    cy.url().should('include', '/sign-in');
  });

  it('Should be able to access a route protected with getServerSideProps when logged in', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy="sign-in-list-item"]').click();
    cy.url().should('include', '/sign-in');
    cy.get('input[name="email"]').type('test@test.com');
    cy.get('input[name="password"]').type('testtest');
    cy.get('button[type="submit"').click();
    cy.getCookie('next-auth.session-token').should('exist');
    cy.visit('http://localhost:3000/protected-route');
    cy.url().should('include', '/protected-route');
  });

  it('Should be able to access a route protected with NextAuth middleware when logged in', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy="sign-in-list-item"]').click();
    cy.url().should('include', '/sign-in');
    cy.get('input[name="email"]').type('test@test.com');
    cy.get('input[name="password"]').type('testtest');
    cy.get('button[type="submit"').click();
    cy.getCookie('next-auth.session-token').should('exist');
    cy.visit('http://localhost:3000/app/dashboard');
    cy.url().should('include', '/app/dashboard');
  });
});
