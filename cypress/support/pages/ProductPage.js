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
        placeOrderBtn: () => cy.get('.btn-success').contains('Place Order')}

    /**
     * @method purchaseMostExpensiveProduct
     * @description Encuentra dinámicamente el producto con el precio más alto y lo compra.
     */
 purchaseMostExpensiveProduct(name, card) {
        this.elements.monitorCategory().click();
        
        // ESPERA AUTOMÁTICA: En lugar de sleep, esperamos que carguen los productos
        this.elements.productCards().should('be.visible');

        let maxPrice = 0;
        let mostExpensiveElement;

        // LÓGICA DINÁMICA: Iterar sobre los productos para encontrar el mayor precio
        cy.get('.card').each(($el) => {
            const priceText = $el.find('h5').text().replace('$', '');
            const price = parseFloat(priceText);

            if (price > maxPrice) {
                maxPrice = price;
                mostExpensiveElement = $el.find('a.hrefch');
            }
        }).then(() => {
            // Hacer clic en el que resultó ser el más caro
            cy.wrap(mostExpensiveElement).click();
            
            // Flujo de compra
            this.elements.addToCartBtn().click();
            this.elements.cartLink().click();
            this.elements.placeOrderBtn().click();
            
            // Llenado de formulario
            cy.get('#name').type(name);
            cy.get('#card').type(card);
            cy.contains('Purchase').click();
        });
    }
}