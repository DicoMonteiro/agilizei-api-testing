import { faker } from '@faker-js/faker';

class Payloads {

    token() {
        return {
            "username" : "admin",
            "password" : "password123"
        }
    }

    bookingPost() {
        return {
            "firstname" : faker.name.firstName(),
            "lastname" : faker.name.lastName(),
            "totalprice" : faker.commerce.price(100, 200, 0),
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2022-12-12",
                "checkout" : "2022-12-31"
            },
            "additionalneeds" : "Breakfast"
        }
    }

    bookingPut() {
        return {
            "firstname" : faker.name.firstName(),
            "lastname" : faker.name.lastName(),
            "totalprice" : faker.commerce.price(100, 200, 0),
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2022-12-12",
                "checkout" : "2022-12-31"
            },
            "additionalneeds" : "Breakfast"
        }
    }

    bookingPatch() {
        return {
            "firstname" : faker.name.firstName(),
            "lastname" : faker.name.lastName()
        }
    }
}

export default new Payloads();