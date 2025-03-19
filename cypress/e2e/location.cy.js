/// <reference types="cypress" />

describe("Share Location", () => {
  beforeEach(() => {
    cy.fixture("user-location.json").then((data)=>{
      this.data=data;
  })
    cy.visit("/");
  });

  it("should display the correct page title", () => {
    cy.get("h1").should("have.length", 1).and("have.text", "Share Location");
  });

  it("should have the share location button disabled", () => {
    cy.get('[data-cy="share-loc-btn"]').should("have.attr", "disabled");
  });

  it("should focus and blur the name input", () => {
    cy.get('[data-cy="name-input"]').focus().blur();
  });

  it("should have the get location button enabled", () => {
    cy.get('[data-cy="get-loc-btn"]').should("not.have.attr", "disabled");
  });

  it("should fetch the user location", () => {
    cy.fixture('user-location.json').as('userLocation');
    cy.window().then((win) =>
      cy
        .stub(win.navigator.geolocation, "getCurrentPosition")
        .as("getCurrentPosition")
        .callsFake((cb) => {
          setTimeout(() => {
            cb({
              coords : {
                latitude: 37.5,
                longtitude: 48.01,
              },
            });
          }, 100);
        })
    );
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get("@getCurrentPosition").should("have.been.called");
    cy.get('[data-cy="get-loc-btn"]').should("not.have.attr", "disabled");
    cy.get('[data-cy="actions"]')
      .should("be.visible")
      .and("contain", "Location fetched!");
  });

  it("should receive error message when input field is empty", () => {
    cy.window().then((win) =>
      cy
        .spy(win.navigator.geolocation, "getCurrentPosition")
        .as("getCurrentPosition")
    );
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get("@getCurrentPosition").should("have.been.called");
    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get('[data-cy="error-message"]')
      .should("be.visible")
      .and("contain", "Please enter your name");
  });

  it("should display an error message when geolocation is not available or permission is denied", () => {
    cy.window().then((win) =>
      cy
        .stub(win.navigator.geolocation, "getCurrentPosition")
        .callsFake((success, error) => {
          error();
        })
    );

    cy.get('[data-cy="get-loc-btn"]').click();

    cy.get('[data-cy="info-message"]')
      .should("be.visible")
      .and(
        "contain",
        "Your browser or permission settings do not allow location fetching"
      );
  });


  




});
