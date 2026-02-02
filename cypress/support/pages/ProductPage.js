/**
 * @class ProductPage
 * @description Clase que representa la página de productos y carrito de DemoBlaze.
 * Implementa el patrón Page Object Model para centralizar selectores y acciones.
 */
export class ProductPage {
    // Selectores centralizados para fácil mantenimiento
    elements = {
        monitorCategory: () => cy.contains('a', 'Monitors'),
        productCards: () => cy.get('.card'),
        addToCartBtn: () => cy.contains('a', 'Add to cart'),
        cartLink: () => cy.get('#cartur'),
        placeOrderBtn: () => cy.get('.btn-success').contains('Place Order')
    }

    /**
     * @method purchaseMostExpensiveProduct
     * @description Encuentra dinámicamente el producto con el precio más alto y lo compra.
     */
    purchaseMostExpensiveProduct(name, card) {
        // 1. Ir a categoría y esperar a que la URL cambie o la lista se refresque
        this.elements.monitorCategory().click();
        cy.wait(2000); // Tiempo de gracia para que el DOM de DemoBlaze se estabilice

        let maxPrice = 0;
        let mostExpensiveName = '';

        this.elements.productCards().should('be.visible').each(($el) => {
            const priceText = $el.find('h5').text().replace('$', '');
            const price = parseFloat(priceText);
            const productName = $el.find('a.hrefch').text();

            if (price > maxPrice) {
                maxPrice = price;
                mostExpensiveName = productName.trim();
            }
        }).then(() => {
            // 2. RE-INTENTO: Buscamos el elemento de nuevo justo antes del clic
            // Usamos una aserción de existencia para asegurar que el DOM está listo
            cy.contains('a', mostExpensiveName).should('exist').click({ force: true });
            
            // 3. Flujo de compra con esperas entre acciones
            this.elements.addToCartBtn().should('be.visible').click();
            this.elements.cartLink().click();
            
            this.elements.placeOrderBtn().should('be.visible').click();
            
            cy.get('#name').should('be.visible').type(name, { delay: 100 });
            cy.get('#card').should('be.visible').type(card, { delay: 100 });
            
            cy.contains('button', 'Purchase').click();
        });
    }
}