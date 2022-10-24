const { assert } = require('chai');

describe('Главная страница', async function() {
    it('Главная страница отображается корректно', async function() {
        await this.browser.url('http://localhost:3000/hw/store');
        await this.browser.assertView('plain', '.Application', {
            compositeImage: false,
            allowViewportOverflow: true,
            ignoreElements: [
                '.nav-link:last-child'
            ]
        });
    })
});