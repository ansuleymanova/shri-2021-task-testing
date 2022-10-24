const { assert } = require('chai');

describe('Страница товара', async function() {
    it('По ссылке на карточке можно перейти в детали', async function() {
        await this.browser.url('http://localhost:3000/hw/store/catalog');
        const link = await this.browser.$('.card-link');
        await link.waitForClickable();
        link.click();
        await this.browser.assertView('plain', '.Application', {
            compositeImage: false,
            allowViewportOverflow: true,
            ignoreElements: [
                '.ProductDetails-Name',
                '.ProductDetails-Description',
                '.ProductDetails-Price',
                '.ProductDetails-Material',
                '.ProductDetails-Color',
                '.nav-link:last-child',
            ]
        });
    });
    it('На странице с деталями можно добавить товар в корзину', async function() {
        await this.browser.url('http://localhost:3000/hw/store/catalog');
        const link = await this.browser.$('.card-link');
        await link.waitForClickable();
        link.click();
        const title = await this.browser.$('.ProductDetails-Name').getText();
        const button = await this.browser.$('.ProductDetails-AddToCart');
        await button.waitForClickable();
        button.click();
        await this.browser.assertView('plain', '.Application', {
            compositeImage: false,
            allowViewportOverflow: true,
            ignoreElements: [
                '.nav-link:last-child',
                '.ProductDetails-Name',
                '.ProductDetails-Price',
                '.ProductDetails-Material',
                '.ProductDetails-Color'
            ]
        });
        const badge = await this.browser.$('.CartBadge');
        assert.exists(badge);
    });
});