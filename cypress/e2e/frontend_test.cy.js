/**
 * @file frontend_test.cy.js
 * @description Suite de pruebas para el flujo de ingresos (E-commerce).
 * Se enfoca en el camino crítico: Selección, Carrito y Pago.
 */

import { ProductPage } from '../support/pages/ProductPage';

const productPage = new ProductPage();

describe('Frontend: Protección del Ingreso - DemoBlaze', () => {

    /**
     * @testCase Compra exitosa del monitor más costoso
     * @business_goal Garantizar que los usuarios VIP puedan adquirir productos de alto valor sin errores.
     */
    it('Debe encontrar, añadir y comprar el monitor más caro exitosamente', () => {
        
        // 1. Visitar la URL base definida en la configuración
        cy.visit('https://www.demoblaze.com/');

        // 2. Ejecutar flujo de compra encapsulado en el Page Object
        // El POM mejora la legibilidad y facilita el mantenimiento si los selectores cambian.
        productPage.purchaseMonitor('VIP User', '4555 1234 5678');

        /**
         * ASERCIÓN DE NEGOCIO:
         * Validamos que el modal de éxito de "SweetAlert" sea visible y contenga el mensaje correcto.
         * Cypress maneja automáticamente la espera hasta que el elemento aparezca en el DOM.
         */
        cy.get('.sweet-alert h2')
          .should('be.visible')
          .and('have.text', 'Thank you for your purchase!');

        // 3. Cerrar el proceso para limpiar el estado de la UI
        cy.contains('OK').click();
    });

    /**
     * @note El manejo de alertas nativas (window.confirm) se realiza de forma 
     * transparente por Cypress, aceptándolas automáticamente para no bloquear el flujo.
     */
});