/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { Application } from "../../src/client/Application";
import { getItem, renderWithProviders, api, cart } from "./utils";
import {addToCart, clearCart, initStore} from "../../src/client/store";

const store = initStore(api, cart);

describe('Компонент «Панель навигации»', () => {
    it('На панели навигации есть лого, ведущее на главную страницу', () => {
        const { queryAllByRole } = renderWithProviders(<Application />);
        const links = queryAllByRole('link');
        expect(links[0].textContent).toBe('Example store');
        expect(links[0]).toHaveAttribute('href', `/`);
    });
    it('На панели навигации есть ссылка, ведущая в каталог', () => {
        const { queryAllByRole } = renderWithProviders(<Application />);
        const links = queryAllByRole('link');
        expect(links[1].textContent).toBe('Catalog');
        expect(links[1]).toHaveAttribute('href', `/catalog`);
    });
    it('На панели навигации есть ссылка, ведущая на страницу доставки', () => {
        const { queryAllByRole } = renderWithProviders(<Application />);
        const links = queryAllByRole('link');
        expect(links[2].textContent).toBe('Delivery');
        expect(links[2]).toHaveAttribute('href', `/delivery`);
    });
    it('На панели навигации есть ссылка, ведущая на страницу контактов', () => {
        const { queryAllByRole } = renderWithProviders(<Application />);
        const links = queryAllByRole('link');
        expect(links[3].textContent).toBe('Contacts');
        expect(links[3]).toHaveAttribute('href', `/contacts`);
    });
    it('На панели навигации есть ссылка, ведущая в корзину', () => {
        const { queryAllByRole } = renderWithProviders(<Application />);
        const links = queryAllByRole('link');
        expect(links[4].textContent).toBe('Cart');
        expect(links[4]).toHaveAttribute('href', `/cart`);
    });
    it('Корзина не отображает количество товаров, если туда ничего не добавлено', () => {
        const { queryByText } = renderWithProviders(<Application />);
        const cartLink = queryByText(/Cart/i).textContent;
        expect(cartLink).toBe('Cart');
    });
    it('Корзина отображает количество товаров, если туда что-то добавлено', () => {
        // пробовала инициализировать store в каждом тесте, но все равно
        // получался один и тот же инстанс?? даже в разных describe.
        // поэтому чищу корзину в начале теста
        store.dispatch(clearCart());
        store.dispatch(addToCart(getItem()));
        const { queryByText } = renderWithProviders(<Application />, { store });
        const cartLink = queryByText(/Cart/i).textContent;
        expect(cartLink).toBe('Cart (1)');
    });
    it('Корзина отображает один товар, если добавить несколько экземпляров одного товара', () => {
        store.dispatch(clearCart());
        const item = getItem();
        store.dispatch(addToCart(item));
        store.dispatch(addToCart(item));
        const { queryByText } = renderWithProviders(<Application />, { store });
        const cartLink = queryByText(/Cart/i).textContent;
        expect(cartLink).toBe('Cart (1)');
    });
    it('Корзина отображает число товаров, если добавить несколько разных товаров', () => {
        store.dispatch(clearCart());
        store.dispatch(addToCart(getItem()));
        store.dispatch(addToCart(getItem()));
        store.dispatch(addToCart(getItem()));
        const { queryByText } = renderWithProviders(<Application />, { store });
        const cartLink = queryByText(/Cart/i).textContent;
        expect(cartLink).toBe('Cart (3)');
        store.dispatch(clearCart());
    });
})
