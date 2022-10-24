const { assert } = require('chai');

describe('Корзина', async function() {
    it('Страница пустой корзины отображается корректно', async function() {
        await this.browser.url('http://localhost:3000/hw/store/cart');
        await this.browser.assertView('plain', '.Application', {
            compositeImage: false,
            allowViewportOverflow: true
        });
    });
});