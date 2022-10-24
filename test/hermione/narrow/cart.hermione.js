const { assert } = require('chai');

describe('Корзина', async function() {
    it('Страница корзины с товарами отображается корректно при ширине экрана 500px', async function() {
        await this.browser.url('http://localhost:3000/hw/store/catalog');
        const link = await this.browser.$('.card-link');
        await link.waitForClickable();
        link.click();
        const button = await this.browser.$('.ProductDetails-AddToCart');
        await button.waitForClickable();
        button.click();
        const burger = await this.browser.$('.Application-Toggler');
        await burger.waitForClickable();
        burger.click();
        const cart = await this.browser.$('.nav-link:last-child');
        cart.click();
        await this.browser.assertView('Whole-Page', '.Application', {
            compositeImage: false,
            allowViewportOverflow: true,
            ignoreElements: [
                '.Cart-Name',
                '.Cart-Price',
                '.Cart-Total',
                '.Cart-OrderPrice'
            ]
        });
        const resetButton = await this.browser.$('.Cart-Clear');
        resetButton.click();
    });
});