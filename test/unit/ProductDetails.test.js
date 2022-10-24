/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import {ProductDetails} from "../../src/client/components/ProductDetails";
import { getItem, renderWithProviders, api, cart } from "./utils";
import {addToCart, clearCart, initStore} from "../../src/client/store";
import {fireEvent, screen} from "@testing-library/react";

const store = initStore(api, cart);

describe('Компонент «Страница товара»', () => {
    it('На странице отображается название товара', () => {
        const item = getItem();
        const { queryByText } = renderWithProviders(<ProductDetails product={item}/>);
        expect(queryByText(item.name)).toBeInTheDocument();
    });
    it('На странице отображается цена товара', () => {
        const item = getItem();
        item.price = "33455678";
        const { queryByText } = renderWithProviders(<ProductDetails product={item}/>);
        expect(queryByText("$33455678")).toBeInTheDocument();
    });
    it('На странице отображается цвет товара', () => {
        const item = getItem();
        const { queryByText } = renderWithProviders(<ProductDetails product={item}/>);
        expect(queryByText(item.color)).toBeInTheDocument();
    });
    it('На странице отображается материал товара', () => {
        const item = getItem();
        const { queryByText } = renderWithProviders(<ProductDetails product={item}/>);
        expect(queryByText(item.material)).toBeInTheDocument();
    });
    it('На странице отображается описание товара', () => {
        const item = getItem();
        const { queryByText } = renderWithProviders(<ProductDetails product={item}/>);
        expect(queryByText(item.description)).toBeInTheDocument();
    });
    it('На странице отображается кнопка "Добавить в корзину"', () => {
        const { queryByText } = renderWithProviders(<ProductDetails product={getItem()}/>);
        expect(queryByText(/Add to Cart/i)).toBeInTheDocument();
    });
    it('CartBadge отсутствует, если товар не в корзине', () => {
        const { queryByText } = renderWithProviders(<ProductDetails product={getItem()}/>);
        expect(queryByText(/Item in cart/i)).not.toBeInTheDocument();
    });
    it('CartBadge присутствует, если товар в корзине', () => {
        const newItem = getItem();
        store.dispatch(addToCart(newItem));
        const { queryByText } = renderWithProviders(<ProductDetails product={newItem}/>, { store });
        expect(queryByText(/Item in cart/i)).toBeInTheDocument();
        store.dispatch(clearCart());
    });
    it('Кнопка "Добавить в корзину" добавляет товар в корзину', () => {
        renderWithProviders(<ProductDetails product={getItem()}/>);
        const button = screen.getByRole('button');
        expect(screen.queryByText(/Item in cart/i)).not.toBeInTheDocument();
        fireEvent.click(button);
        expect(screen.queryByText(/Item in cart/i)).toBeInTheDocument();
    });
})
