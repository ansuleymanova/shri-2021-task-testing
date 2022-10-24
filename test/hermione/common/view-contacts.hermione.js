const { assert } = require('chai');

describe('Страница с контактами', async function() {
    it('Страница с контактами отображается корректно', async function() {
        await this.browser.url('http://localhost:3000/hw/store/contacts');
        await this.browser.assertView('plain', '.Application', {
            compositeImage: false,
            allowViewportOverflow: true
        });
    });
});