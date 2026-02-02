import { ProductPage } from '../support/pages/ProductPage';

const productPage = new ProductPage();

describe('Desafío Técnico Global Tech', () => {

    it('Reto 1: Compra del monitor más caro (Frontend)', () => {
        cy.visit('https://www.demoblaze.com/');
        productPage.purchaseMonitor('VIP User', '123456789');
        cy.get('.sweet-alert h2').should('contain', 'Thank you');
    });

    it('Reto 2: Ciclo de vida de Reserva (API)', () => {
        // 1. Auth
        cy.request('POST', 'https://restful-booker.herokuapp.com/auth', {
            username: "admin", password: "password123"
        }).then((authRes) => {
            const token = authRes.body.token;

            // 2. Crear
            cy.request('POST', 'https://restful-booker.herokuapp.com/booking', {
                firstname: "QA", lastname: "Junior", totalprice: 111,
                depositpaid: true, bookingdates: { checkin: "2026-01-01", checkout: "2026-01-02" },
                additionalneeds: "Breakfast"
            }).then((createRes) => {
                const id = createRes.body.bookingid;

                // 3. Update & Verify
                cy.request({
                    method: 'PUT', url: `https://restful-booker.herokuapp.com/booking/${id}`,
                    headers: { Cookie: `token=${token}` },
                    body: { firstname: "QA_Updated", lastname: "Junior", totalprice: 111,
                            depositpaid: true, bookingdates: { checkin: "2026-01-01", checkout: "2026-01-02" },
                            additionalneeds: "Breakfast" }
                }).its('body.firstname').should('eq', 'QA_Updated');
            });
        });
    });
});