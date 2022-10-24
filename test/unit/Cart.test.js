/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { getItem, renderWithProviders, api, cart } from "./utils";
import {addToCart, clearCart, initStore} from "../../src/client/store";
import {Cart} from "../../src/client/pages/Cart";
import {fireEvent} from "@testing-library/react";

const store = initStore(api, cart);

describe('Компонент «Корзина', () => {
    it('Корзина отображает сообщение, если она пуста', () => {
        const { queryByText } = renderWithProviders(<Cart />);
        const cart = queryByText(/Cart is empty/i);
        expect(cart).toHaveTextContent('Cart is empty. Please select products in the catalog.');
    });
    it('Корзина не отображает сообщение, если она не пуста', () => {
        store.dispatch(clearCart());
        store.dispatch(addToCart(getItem()));
        const { queryByText } = renderWithProviders(<Cart />, store);
        const cart = queryByText(/Cart is empty/i);
        expect(cart).not.toBeInTheDocument();
    });
    it('Корзина верно отображает имя добавленного товара', () => {
        store.dispatch(clearCart());
        const item = getItem();
        store.dispatch(addToCart(item));
        const { queryAllByRole } = renderWithProviders(<Cart />, store);
        expect(queryAllByRole('cell')[0].textContent).toBe(item.name);
    });
    it('Корзина верно отображает цену добавленного товара', () => {
        store.dispatch(clearCart());
        const item = getItem();
        store.dispatch(addToCart(item));
        const { queryAllByRole } = renderWithProviders(<Cart />, store);
        expect(queryAllByRole('cell')[1].textContent).toBe(`$${item.price}`);
    });
    it('Цена не меняется, если добавить несколько экземпляров', () => {
        store.dispatch(clearCart());
        const item = getItem();
        store.dispatch(addToCart(item));
        store.dispatch(addToCart(item));
        const { queryAllByRole } = renderWithProviders(<Cart />, store);
        expect(queryAllByRole('cell')[1].textContent).toBe(`$${item.price}`);
    });
    it('Корзина верно отображает количество добавленного товара', () => {
        store.dispatch(clearCart());
        const item = getItem();
        store.dispatch(addToCart(item));
        const { queryAllByRole } = renderWithProviders(<Cart />, store);
        expect(queryAllByRole('cell')[2].textContent).toBe("1");
    });
    it('Корзина верно отображает количество добавленного товара, если добавлено несколько экземпляров', () => {
        store.dispatch(clearCart());
        const item = getItem();
        store.dispatch(addToCart(item));
        store.dispatch(addToCart(item));
        store.dispatch(addToCart(item));
        const { queryAllByRole } = renderWithProviders(<Cart />, store);
        expect(queryAllByRole('cell')[2].textContent).toBe("3");
    });
    it('Корзина верно отображает сумму к оплате', () => {
        store.dispatch(clearCart());
        const item = getItem();
        const secondItem = getItem();
        item.price = 1;
        secondItem.price = 2;
        store.dispatch(addToCart(item));
        store.dispatch(addToCart(secondItem));
        const { queryAllByRole } = renderWithProviders(<Cart />, store);
        expect(queryAllByRole('cell')[9].textContent).toBe("$3");
    });
    it('Корзина отображает сообщение, если нажать на кнопку сброса', () => {
        store.dispatch(clearCart());
        const item = getItem();
        store.dispatch(addToCart(item));
        const { queryByText } = renderWithProviders(<Cart />, store);
        const button = queryByText(/Clear shopping cart/i);
        fireEvent.click(button);
        expect(queryByText(/Cart is empty/i)).toHaveTextContent('Cart is empty. Please select products in the catalog.');
    });
    it('В корзине с товарами есть форма для чекаута', () => {
        store.dispatch(clearCart());
        store.dispatch(addToCart(getItem()));
        const { queryByText } = renderWithProviders(<Cart />, store);
        expect(queryByText(/Checkout/i)).toBeInTheDocument();
    });
    it('В корзине без товаров нет формы для чекаута', () => {
        store.dispatch(clearCart());
        const { queryByText } = renderWithProviders(<Cart />);
        expect(queryByText(/Checkout/i)).not.toBeInTheDocument();
    });
    it('В форме для чекаута есть поле "Имя"', () => {
        const item = getItem();
        item.name = 'Something other';
        store.dispatch(clearCart());
        store.dispatch(addToCart(item));
        const { queryAllByRole, queryByText } = renderWithProviders(<Cart />, store);
        expect(queryByText("Name")).toBeInTheDocument();
        expect(queryAllByRole('textbox')[0]).toHaveAttribute('id', 'f-name');
    });
    it('В форме для чекаута есть поле "Номер телефона"', () => {
        const item = getItem();
        item.name = 'Something other';
        store.dispatch(clearCart());
        store.dispatch(addToCart(item));
        const { queryAllByRole, queryByText } = renderWithProviders(<Cart />, store);
        expect(queryByText("Phone")).toBeInTheDocument();
        expect(queryAllByRole('textbox')[1]).toHaveAttribute('id', 'f-phone');
    });
    it('В форме для чекаута есть поле "Адрес"', () => {
        const item = getItem();
        item.name = 'Something other';
        store.dispatch(clearCart());
        store.dispatch(addToCart(item));
        const { queryAllByRole, queryByText } = renderWithProviders(<Cart />, store);
        expect(queryByText("Address")).toBeInTheDocument();
        expect(queryAllByRole('textbox')[2]).toHaveAttribute('id', 'f-address');
    });
    it('В поле "Имя" можно ввести что-то', () => {
        const item = getItem();
        item.name = 'Something other';
        store.dispatch(clearCart());
        store.dispatch(addToCart(item));
        const { queryAllByRole } = renderWithProviders(<Cart />, store);
        const textbox = queryAllByRole('textbox')[0];
        fireEvent.change(textbox, {target: {value: 'John Doe'}});
        expect(textbox.value).toBe('John Doe');
    });
    it('В поле "Номер" можно ввести что-то', () => {
        const item = getItem();
        item.name = 'Something other';
        store.dispatch(clearCart());
        store.dispatch(addToCart(item));
        const { queryAllByRole } = renderWithProviders(<Cart />, store);
        const textbox = queryAllByRole('textbox')[1];
        fireEvent.change(textbox, {target: {value: '49503034920'}});
        expect(textbox.value).toBe('49503034920');
    });
    it('В поле "Номер" можно ввести что-то', () => {
        const item = getItem();
        item.name = 'Something other';
        store.dispatch(clearCart());
        store.dispatch(addToCart(item));
        const { queryAllByRole } = renderWithProviders(<Cart />, store);
        const textbox = queryAllByRole('textbox')[2];
        fireEvent.change(textbox, {target: {value: '69420 Memory Lane'}});
        expect(textbox.value).toBe('69420 Memory Lane');
    });
})
