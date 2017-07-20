'use strict';

let url = 'http://localhost:3002';

const addToCartButton = `div[data-qa="productList"] div:nth-child(1) span[data-qa="button"]`;
const cart = `div[data-qa="cart"]`;
const cartItemsList = `${cart} div:nth-child(2)`;
const checkoutButton = `${cart} span[data-qa="button"]`;

const getCartItemByIndex = index => `${cartItemsList} div:nth-child(${index})`;

const firstCartItemInList = getCartItemByIndex(1);

const addToCart = client => (
    client
        .waitForElementVisible(addToCartButton, 1000)
        .click(addToCartButton)
);

module.exports = {
    before(browser) {
        url = browser.launch_url;
    },

    'Add a Cart': client => {
        client.url(url);

        addToCart(client);

        client
            .pause(500)
            .assert.visible(firstCartItemInList)
            .end();
    },

    'Cart checkout': client => {
        const emptyCart = 'Use drag-n-drop or Add to cart button to add products to cart.';

        client.url(url);

        addToCart(client);

        client
            .pause(500)
            .assert.visible(firstCartItemInList)
            .waitForElementVisible(checkoutButton, 1000)
            .click(checkoutButton)
            .pause(500)
            .assert.containsText(cartItemsList, emptyCart)
            .end();
    }
};
