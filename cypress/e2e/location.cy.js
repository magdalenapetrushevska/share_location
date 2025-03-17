/// <reference types="cypress" />

describe('Share Location', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the correct page title', () => {
    cy.get('h1').should('have.length', 1).and('have.text', 'Share Location');
  });

  it('should have the share location button disabled', () => {
    cy.get('[data-cy="share-loc-btn"]').should('have.attr', 'disabled');
  });

  it('should focus and blur the name input', () => {
    cy.get('[data-cy="name-input"]').focus().blur();
  });

  it('should have the get location button enabled', () => {   
    cy.get('[data-cy="get-loc-btn"]').should('not.have.attr', 'disabled');
  });
});
