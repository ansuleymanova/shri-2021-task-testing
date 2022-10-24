/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { getItem, renderWithProviders, api, cart } from "./utils";
import {initStore, productsLoaded} from "../../src/client/store";
import { Catalog } from "../../src/client/pages/Catalog";

const store = initStore(api, cart);

describe('Компонент «Каталог»', () => {
    it('На странице отображается заголовок', () => {
        const { queryAllByRole } = renderWithProviders(<Catalog />, {store});
        expect(queryAllByRole('heading').length).toBe(1);
    });
    // it('На странице отображаюся товары', () => {
    //     const item1 = getItem();
    //     item1.name = 'Unimaginable spoon';
    //     const item2 = getItem();
    //     item2.name = 'Incredible fork';
    //     const products = [item1, item2];
    //     store.dispatch(productsLoaded(products));
    //     const { queryAllByRole } = renderWithProviders(<Catalog />, {store});
    //     console.log(queryAllByRole('heading').length);
    //     expect(queryByText(/Unimaginable spoon/i)).toBeInTheDocument();
    //     expect(queryByText(/Incredible fork/i)).toBeInTheDocument();
    // });
});