/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import {ProductItem} from "../../src/client/components/ProductItem";
import { getItem, renderWithProviders, api, cart } from "./utils";
import {addToCart, clearCart, initStore} from "../../src/client/store";


describe('Компонент «Карточка товара»', () => {
    it('На карточке отображается название товара', () => {
        const item = getItem();
        const { queryByText } = renderWithProviders(<ProductItem product={item}/>);
        expect(queryByText(item.name)).toBeInTheDocument();
    });
    it('На карточке отображается цена товара', () => {
        const item = getItem();
        item.price = "394583930";
        const { queryByText } = renderWithProviders(<ProductItem product={item}/>);
        expect(queryByText("$394583930")).toBeInTheDocument();
    });
    it('На карточке отображается ссылка на страницу товара', () => {
        const item = getItem();
        item.name = 'Pants';
        item.id = '0';
        const { queryByText } = renderWithProviders(<ProductItem product={item}/>);
        const anchor = queryByText(/details/i).closest('a');
        expect(anchor).toHaveAttribute('href', `/catalog/0`);
    });
    it('CartBadge отсутствует, если товар не в корзине', () => {
        const newItem = getItem();
        const { queryByText } = renderWithProviders(<ProductItem product={newItem}/>);
        expect(queryByText(/Item in cart/i)).not.toBeInTheDocument();
    });
    it('CartBadge присутствует, если товар в корзине', () => {
        const newItem = getItem();
        const store = initStore(api, cart);
        store.dispatch(addToCart(newItem));
        const { queryByText } = renderWithProviders(<ProductItem product={newItem}/>, { store });
        expect(queryByText(/Item in cart/i)).toBeInTheDocument();
        store.dispatch(clearCart());
    });
})
