/// <reference types="cypress" />

import req from '../support/api/requests';
import assertions from '../support/api/assertions'

context('Ping', () => {
    it('GET Healthcheck - Validar que a aplicação está no ar @healthcheck', () => {
        //req.getPing().its("status").should("eq",201)
        // cy.request -> response -> body, status, headers
        // .its() -> 

        req.getPing().then((response) => {
            assertions.shouldHaveStatus(response, 201)
        })
    });
});