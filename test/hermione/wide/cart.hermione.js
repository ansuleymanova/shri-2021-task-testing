const { assert } = require('chai');

describe('Корзина', async function() {
    it('Страница корзины с товарами отображается корректно при ширине экрана 1200px', async function() {
        await this.browser.url('http://localhost:3000/hw/store/catalog');
        const link = await this.browser.$('.card-link');
        link.click();
        const button = await this.browser.$('.ProductDetails-AddToCart');
        button.click();
        const badge = await this.browser.$('.CartBadge');
        const cart = await this.browser.$('.nav-link:last-child');
        assert.exists(badge);
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