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
    it('Debe iterar, encontrar el monitor más caro y comprarlo', () => {
        
        // 1. Visitar la URL base definida en la configuración
        // Aumentamos el tiempo de espera de la página
        cy.visit('https://www.demoblaze.com/', { timeout: 30000 });

        // 2. Ejecutar flujo de compra encapsulado en el Page Object
        // El POM mejora la legibilidad y facilita el mantenimiento si los selectores cambian.
        productPage.purchaseMostExpensiveProduct('VIP User', '4555 1234 5678');

        // REPARACIÓN: DemoBlaze usa alertas nativas o modales. 
        // Esta aserción es más segura para detectar el éxito de la compra:
        cy.contains('Thank you for your purchase!', { timeout: 10000 }).should('be.visible');
        cy.get('.confirm').click(); // Cierra el modal de éxito
    });
});