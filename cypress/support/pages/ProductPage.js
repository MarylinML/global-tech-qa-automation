/**
 * @class ProductPage
 * @description Clase que representa la página de productos y carrito de DemoBlaze.
 * Implementa el patrón Page Object Model para centralizar selectores y acciones.
 */
export class ProductPage {
    // Selectores centralizados para fácil mantenimiento
    getMonitorCategory() { return cy.contains('Monitors'); }
    getAppleMonitor() { return cy.contains('Apple monitor 24'); }
    getAddToCartBtn() { return cy.contains('Add to cart'); }
    getCartLink() { return cy.get('#cartur'); }
    getPlaceOrderBtn() { return cy.get('.btn-success').contains('Place Order'); }

    /**
     * @method purchaseMonitor
     * @description Realiza el flujo completo de compra de un monitor desde la selección hasta el pago.
     * @param {string} name - Nombre del cliente VIP.
     * @param {string} card - Número de tarjeta de crédito.
     */
    purchaseMonitor(name, card) {
        // Navegación y selección
        this.getMonitorCategory().click();
        this.getAppleMonitor().click();
        
        // Acción de agregar al carrito (Cypress maneja el alert automáticamente)
        this.getAddToCartBtn().click();
        
        // Proceso de Checkout
        this.getCartLink().click();
        this.getPlaceOrderBtn().click();
        
        // Llenado de formulario de pago
        cy.get('#name').type(name);
        cy.get('#card').type(card);
        cy.contains('Purchase').click();
    }
}