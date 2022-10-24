/**
 * @jest-environment jsdom
 */

import {faker} from '@faker-js/faker/locale/en';
import { render } from '@testing-library/react'
import { Provider } from 'react-redux';
import { initStore } from "../../src/client/store";
import {CartApi, ExampleApi} from "../../src/client/api";
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

const basename = '/hw/store';
export const api = new ExampleApi(basename);
export const cart = new CartApi();


export function renderWithProviders(
    ui,
    {
        preloadedState = {},
        store = initStore(api, cart),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return <MemoryRouter><Provider store={store}>{children}</Provider></MemoryRouter>
    }
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export function getItem() {
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: Number(faker.commerce.price(0, 1500, 0)),
        id: faker.datatype.number(100),
        color: faker.color.human(),
        material: faker.word.noun(),
    }
}