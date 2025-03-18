/// <reference types="cypress" />

describe("Share Location", () => {
  it("should display the correct page title", () => {
    cy.visit("/");
    cy.get("h1").should("have.length", 1).and("have.text", "Share Location");
  });

  it("should have the share location button disabled", () => {
    cy.visit("/");
    cy.get('[data-cy="share-loc-btn"]').should("have.attr", "disabled");
  });

  it("should focus and blur the name input", () => {
    cy.visit("/");
    cy.get('[data-cy="name-input"]').focus().blur();
  });

  it("should have the get location button enabled", () => {
    cy.visit("/");
    cy.get('[data-cy="get-loc-btn"]').should("not.have.attr", "disabled");
  });

  it("should fetch the user location", () => {
    cy.visit("/").then((win) =>
      cy
        .spy(win.navigator.geolocation, "getCurrentPosition")
        .as("getCurrentPosition")
    );
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get("@getCurrentPosition").should("have.been.called");
    cy.get('[data-cy="share-loc-btn"]').should("be.disabled");
    cy.get('[data-cy="actions"]').contains("Location fetched!");
  });

  it("should receive error message when input field is empty", () => {
    cy.visit("/").then((win) =>
      cy
        .spy(win.navigator.geolocation, "getCurrentPosition")
        .as("getCurrentPosition")
    );
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get("@getCurrentPosition").should("have.been.called");
    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get('[data-cy="error-message"]').contains("Please enter your name");
  });



});
