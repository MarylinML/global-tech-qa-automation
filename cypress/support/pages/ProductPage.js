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
            // En lugar de usar el elemento viejo, buscamos el nombre y hacemos clic
            // Esto evita el error de "Detached from DOM"
            cy.contains('a.hrefch', mostExpensiveName).click();
            
            this.elements.addToCartBtn().click();
            this.elements.cartLink().click();
            this.elements.placeOrderBtn().click();
            
            cy.get('#name').type(name);
            cy.get('#card').type(card);
            cy.contains('Purchase').click();
        });
    }
}