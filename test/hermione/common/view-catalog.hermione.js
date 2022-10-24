const { assert } = require('chai');

describe('Каталог', async function() {
    it('Страница каталога отображается корректно', async function() {
        await this.browser.url('http://localhost:3000/hw/store/catalog');
        await this.browser.assertView('Whole-Page', '.Application', {
            compositeImage: false,
            allowViewportOverflow: true,
            ignoreElements: [
                '.nav-link:last-child',
                '.ProductItem-Name',
                '.ProductItem-Price',
                '.CartBadge'
            ]
        });
    });
});