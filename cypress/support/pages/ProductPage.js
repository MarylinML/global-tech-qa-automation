/**
 * @class ProductPage
 * @description Clase que representa la página de productos y carrito de DemoBlaze.
 * Implementa el patrón Page Object Model para centralizar selectores y acciones.
 */
export class ProductPage {
    // Selectores centralizados para fácil mantenimiento
    elements = {
        monitorCategory: () => cy.contains('Monitors'),
        productCards: () => cy.get('.card'),
        productPrice: () => cy.get('h5'),
        addToCartBtn: () => cy.contains('Add to cart'),
        cartLink: () => cy.get('#cartur'),
        placeOrderBtn: () => cy.get('.btn-success').contains('Place Order')
    }

    /**
     * @method purchaseMostExpensiveProduct
     * @description Encuentra dinámicamente el producto con el precio más alto y lo compra.
     */
    purchaseMostExpensiveProduct(name, card) {
        this.elements.monitorCategory().click();
        
        // Esperamos a que los productos carguen
        this.elements.productCards().should('be.visible');

        let maxPrice = 0;
        let mostExpensiveName = '';

        // Iterar para encontrar el precio y el NOMBRE del más caro
        cy.get('.card').each(($el) => {
            const priceText = $el.find('h5').text().replace('$', '');
            const price = parseFloat(priceText);
            const productName = $el.find('a.hrefch').text();

            if (price > maxPrice) {
                maxPrice = price;
                mostExpensiveName = productName.trim();
            }
        }).then(() => {
            // Buscamos el nombre y hacemos clic
            cy.contains('a.hrefch', mostExpensiveName).click();
            
            // Manejo de la alerta y flujo de carrito
            this.elements.addToCartBtn().click();
            this.elements.cartLink().click();
            
            // Esperar a que el botón de pedido sea visible antes de clicar
            this.elements.placeOrderBtn().should('be.visible').click();
            
            // Llenado de formulario con pequeños ajustes de estabilidad
            cy.get('#name').should('be.visible').type(name, { force: true });
            cy.get('#card').should('be.visible').type(card, { force: true });
            
            // Clic final en Purchase
            cy.contains('button', 'Purchase').click({ force: true });
        });
    }
}