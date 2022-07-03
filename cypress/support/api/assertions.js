class Assertions {
   
    shouldHaveStatus(response, status) {
        expect(response.status, "Status Response").to.eql(status); 
    }

    validateContractOf(response, schema) {
        cy.wrap(response.body, "Validate Properties").should(
            schema
        )
    }

    shouldExists(response) {
        expect(response.body.bookingid, "Booking exists").to.not.be.null;
    }

    validateHeaders(response) {
        expect(response.headers, "Headers properties").to.include({
            server: "Cowboy",
            connection: "keep-alive",
            'x-powered-by': "Express",
            'content-type': "application/json; charset=utf-8"
        })
    }

    validateDuration(response) {
        expect(response.duration, "Request time").lessThan(900)
    }
}

export default new Assertions();