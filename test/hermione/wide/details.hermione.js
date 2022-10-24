const { assert } = require('chai');

describe('Страница товара', async function() {
    it('Повторное нажатие кнопки "Добавить в корзину" увеличивает количество товара в корзине (1200px)', async function() {
        await this.browser.url('http://localhost:3000/hw/store/catalog');
        const link = await this.browser.$('.card-link');
        link.click();
        const title = await this.browser.$('.ProductDetails-Name').getText();
        const button = await this.browser.$('.ProductDetails-AddToCart');
        button.click();
        button.click();
        const cart = await this.browser.$('.nav-link:last-child');
        cart.click();
        const titleInCart = await this.browser.$('.Cart-Name').getText();
        assert.equal(title, titleInCart);
        const quantity = await this.browser.$('.Cart-Count').getText();
        assert.equal(quantity, "2");
        const resetButton = await this.browser.$('.Cart-Clear');
        resetButton.click();
    });
});