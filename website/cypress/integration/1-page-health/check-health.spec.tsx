/// <reference types="cypress"/>

import urls from "../../test-urls.json";

describe("Testing health for all pages", () => {
  urls.forEach((url) => {
    it(`No errorboundary: ${url}`, () => {
      cy.visit(url);
      cy.wait(100);
      cy.get(".vk-errorboundary").should("not.exist");
    });

    it(`Does not return 404: ${url}`, () => {
      cy.visit(url);
      cy.wait(100);
      cy.get("#vk-notFoundId").should("not.exist");
    });
  });
});

export = {};
