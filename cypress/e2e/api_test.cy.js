describe('Backend: Integridad y Seguridad de Reservas', () => {
    
    /**
     * Test Case: Flujo End-to-End de una reserva.
     * Objetivo: Validar que los datos persisten tras una actualización y que el sistema es seguro.
     */
    it('Ciclo de vida completo de una reserva (CRUD)', () => {
        
        // 1. AUTENTICACIÓN: Obtención de token administrativo
        cy.request('POST', 'https://restful-booker.herokuapp.com/auth', {
            username: "admin", 
            password: "password123"
        }).then((auth) => {
            const token = auth.body.token;

            // 2. CREACIÓN: Generar una nueva reserva
            cy.request('POST', 'https://restful-booker.herokuapp.com/booking', {
                firstname: "QA", 
                lastname: "Test", 
                totalprice: 600,
                depositpaid: true, 
                bookingdates: { checkin: "2026-01-01", checkout: "2026-01-02" },
                additionalneeds: "Dinner"
            }).then((res) => {
                const id = res.body.bookingid;

                // 3. ACTUALIZACIÓN: Modificar datos y validar persistencia (Requerimiento B.3)
                cy.request({
                    method: 'PUT', 
                    url: `https://restful-booker.herokuapp.com/booking/${id}`,
                    headers: { 'Cookie': `token=${token}` },
                    body: { 
                        firstname: "QA-Updated", // Valor a verificar
                        lastname: "Test", 
                        totalprice: 700,
                        depositpaid: true, 
                        bookingdates: { checkin: "2026-01-01", checkout: "2026-01-02" },
                        additionalneeds: "Breakfast" 
                    }
                }).its('body.firstname').should('eq', 'QA-Updated');
            });
        });
    });

    /**
     * Test Case: Seguridad de Borrado
     * Objetivo: Validar que un usuario no autorizado no puede eliminar registros.
     */
    it('Seguridad: Intento de borrado con token inválido', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://restful-booker.herokuapp.com/booking/1',
            failOnStatusCode: false,
            headers: { 'Cookie': 'token=invalid_123' }
        }).then((res) => {
            expect(res.status).to.eq(403); // Status esperado: Forbidden
        });
    });
});