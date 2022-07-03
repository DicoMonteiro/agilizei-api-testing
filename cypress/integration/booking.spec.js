/// <reference types="cypress" />

import req from '../support/api/requests';
import assertions from '../support/api/assertions'
import schemas from '../support/api/schemas'
import payloads from '../support/api/payloads'
//Validador de contrato do endpoint, request e response.
//import spok from 'cy-spok'

context('Booking', () => {
    it('GET Booking - Validar o contrato do GET @contract', () => {
        req.getBookingById(1).then((response) => {
            assertions.shouldHaveStatus(response, 200)
            assertions.validateContractOf(response, schemas.getBookingSchema())
        })
    });

    it('Criar uma reserva com sucesso @functional', () => {
        req.postBooking(payloads.bookingPost()).then((response) => {
            assertions.shouldHaveStatus(response, 200)
            assertions.shouldExists(response)
            assertions.validateHeaders(response)
            assertions.validateDuration(response)
            assertions.validateContractOf(response, schemas.postBookingSchema())
        })
    });

    it('Tentar alterar uma reserva sem token @functional', () => {
        req.postBooking(payloads.bookingPost()).then((response) => {
            assertions.shouldHaveStatus(response, 200)
            const id = response.body.bookingid
            cy.log(id)
            req.putBooking(payloads.bookingPut(), id, "").then((response) => {
                assertions.shouldHaveStatus(response, 403)
            })
        })
        
    });
    
    it('Tentar alterar uma reserva com token inválido @functional', () => {
        req.postBooking(payloads.bookingPost()).then((response) => {
            assertions.shouldHaveStatus(response, 200)
            const id = response.body.bookingid
            cy.log(id)
            req.putBooking(payloads.bookingPut(), id, "7908056cab6a0qe").then((response) => {
                assertions.shouldHaveStatus(response, 403)
            })
        })
    });

    it('Tentar alterar uma reserva inexistente @functional', () => {
        req.auth(payloads.token()).then((response) => {
            assertions.shouldHaveStatus(response, 200)
            const token = response.body.token
            cy.log(token)
            req.putBooking(payloads.bookingPut(), 123456, token).then((response) => {
                assertions.shouldHaveStatus(response, 405)
            })

        })
    });

    it('Alterar toda uma reserva com sucesso @functional', () => {

        req.auth(payloads.token()).then((response) => {
            assertions.shouldHaveStatus(response, 200)
            const token = response.body.token
            cy.log(token)
            req.postBooking(payloads.bookingPost()).then((response) => {
                assertions.shouldHaveStatus(response, 200)
                const id = response.body.bookingid
                cy.log(id)
                req.putBooking(payloads.bookingPut(), id, token).then((response) => {
                    assertions.shouldHaveStatus(response, 200)
                    assertions.shouldExists(response)
                    assertions.validateHeaders(response)
                    assertions.validateDuration(response)
                    assertions.validateContractOf(response, schemas.putBookingSchema())
                })
            })

        })
    });

    it('Tentar alterar uma parte da reserva sem token @functional', () => {
        req.postBooking(payloads.bookingPost()).then((response) => {
            assertions.shouldHaveStatus(response, 200)
            const id = response.body.bookingid
            cy.log(id)
            req.patchBooking(payloads.bookingPatch(), id, "").then((response) => {
                assertions.shouldHaveStatus(response, 403)
            })
        })
        
    });
    
    it('Tentar alterar uma parte da reserva com token inválido @functional', () => {
        req.postBooking(payloads.bookingPost()).then((response) => {
            assertions.shouldHaveStatus(response, 200)
            const id = response.body.bookingid
            cy.log(id)
            req.patchBooking(payloads.bookingPatch(), id, "7908056cab6a0qe").then((response) => {
                assertions.shouldHaveStatus(response, 403)
            })
        })
    });

    it('Tentar alterar uma parte da reserva inexistente @functional', () => {
        req.auth(payloads.token()).then((response) => {
            assertions.shouldHaveStatus(response, 200)
            const token = response.body.token
            cy.log(token)
            req.patchBooking(payloads.bookingPatch(), 123456, token).then((response) => {
                assertions.shouldHaveStatus(response, 405)
            })

        })
    });

    it('Alterar uma parte da reserva com sucesso @functional', () => {
        req.auth(payloads.token()).then((response) => {
            assertions.shouldHaveStatus(response, 200)
            const token = response.body.token
            cy.log(token)
            req.postBooking(payloads.bookingPost()).then((response) => {
                assertions.shouldHaveStatus(response, 200)
                const id = response.body.bookingid
                cy.log(id)
                req.patchBooking(payloads.bookingPatch(), id, token).then((response) => {
                    assertions.shouldHaveStatus(response, 200)
                    assertions.shouldExists(response)
                    assertions.validateHeaders(response)
                    assertions.validateDuration(response)
                    assertions.validateContractOf(response, schemas.getBookingSchema())
                })
            })

        })
        
    });

    it('Tentar excluir uma reserva sem token @functional', () => {
        req.postBooking(payloads.bookingPost()).then((response) => {
            assertions.shouldHaveStatus(response, 200)
            const id = response.body.bookingid
            cy.log(id)
            req.deleteBooking(id, "").then((response) => {
                assertions.shouldHaveStatus(response, 403)
            })
        })
        
    });
    
    it('Tentar excluir uma reserva com token inválido @functional', () => {
        req.postBooking(payloads.bookingPost()).then((response) => {
            assertions.shouldHaveStatus(response, 200)
            const id = response.body.bookingid
            cy.log(id)
            req.deleteBooking(id, "7908056cab6a0qe").then((response) => {
                assertions.shouldHaveStatus(response, 403)
            })
        })
    });

    it('Tentar excluir uma reserva inexistente @functional', () => {
        req.auth(payloads.token()).then((response) => {
            assertions.shouldHaveStatus(response, 200)
            const token = response.body.token
            cy.log(token)
            req.deleteBooking(123456, token).then((response) => {
                assertions.shouldHaveStatus(response, 405)
            })

        })
    });

    it('Excluir uma reserva com sucesso @functional', () => {
        req.auth(payloads.token()).then((response) => {
            assertions.shouldHaveStatus(response, 200)
            const token = response.body.token
            cy.log(token)
            req.postBooking(payloads.bookingPost()).then((response) => {
                assertions.shouldHaveStatus(response, 200)
                const id = response.body.bookingid
                cy.log(id)
                req.deleteBooking(id, token).then((response) => {
                    assertions.shouldHaveStatus(response, 201)
                })
            })

        })
        
    });
});