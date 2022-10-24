const { assert } = require('chai');

describe('Страница доставки', async function() {
    it('Страница доставки отображается корректно', async function() {
        await this.browser.url('http://localhost:3000/hw/store/delivery');
        await this.browser.assertView('plain', '.Application', {
            compositeImage: false,
            allowViewportOverflow: true
        });
    });
});