class Requests {
    getPing() {
        return cy.request({
            method: 'GET',
            url: '/ping'
        })
    }

    getBookingById(id) {
        return cy.request({
            method: 'GET',
            url: `/booking/${id}`
        })
    }

    postBooking(payload) {
        return cy.request({
            method: 'POST',
            url: "/booking",
            body: payload
        })
    }

    auth(payload) {
        return cy.request({
            method: 'POST',
            url: "/auth",
            body: payload
        })
    }

    putBooking(payload, id, token) {
        return cy.request({
            method: 'PUT',
            url: `/booking/${id}`,
            body: payload,
            failOnStatusCode: false,
            headers: { 
                'Content-Type': 'application/json',
                'Cookie': `token=${token}`
            }
        })
    }

    patchBooking(payload, id, token) {
        return cy.request({
            method: 'PATCH',
            url: `/booking/${id}`,
            body: payload,
            failOnStatusCode: false,
            headers: { 
                'Content-Type': 'application/json',
                'Cookie': `token=${token}`
            }
        })
    }

    deleteBooking(id, token) {
        return cy.request({
            method: 'DELETE',
            url: `/booking/${id}`,
            failOnStatusCode: false,
            headers: { 
                'Content-Type': 'application/json',
                'Cookie': `token=${token}`
            }
        })
    }

}

export default new Requests();