import React, { useReducer, createContext, useContext } from 'react';

const initialFilterVal = {
    bigCategoryId: 0,
    smallCategoryId: 0,
    mainSort: 0,
    price: 0,
    priceMin: 0,
    priceMax: 0,
    productTitle: '',
    search: '',
    page: 1,
};

export const INIT = 'INIT';
export const ALL = 'ALL';
export const CATEGORY = 'CATEGORY';
export const MAINSORT = 'MAINSORT';
export const PRICE = 'PRICE';
export const TITLE = 'TITLE';
export const ALLTITLE = 'ALLTITLE';
export const SEARCH = 'SEARCH';
export const PAGE = 'PAGE';

function MainReducer(state, action) {
    switch (action.type) {
        case INIT:
            return initialFilterVal;
        case ALL:
            return {
                ...state,
                bigCategoryId: action.payload.bigCategoryId,
                smallCategoryId: action.payload.smallCategoryId,
                mainSort: action.payload.mainSort,
                price: action.payload.price,
                priceMin: action.payload.priceMin,
                priceMax: action.payload.priceMax,
                productTitle: action.payload.productTitle,
            };
        case CATEGORY:
            return {
                ...state,
                bigCategoryId: action.payload.bigCategoryId,
                smallCategoryId: action.payload.smallCategoryId,
            };

        case MAINSORT:
            return {
                ...state,
                mainSort: action.payload.mainSort,
            };
        case PRICE:
            return {
                ...state,
                price: action.payload.price,
                priceMin: action.payload.priceMin,
                priceMax: action.payload.priceMax,
            };

        case TITLE:
            return {
                ...state,
                productTitle: action.payload.productTitle,
            };

        case SEARCH:
            return {
                ...state,
                search: action.payload.search,
            };
        case PAGE:
            return {
                ...state,
                page: action.payload.page,
            };

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

const MainStateContext = createContext();
const MainDispatchContext = createContext();

export function MainProvider({ children }) {
    const [state, dispatch] = useReducer(MainReducer, initialFilterVal);
    return (
        <MainStateContext.Provider value={state}>
            <MainDispatchContext.Provider value={dispatch}>{children}</MainDispatchContext.Provider>
        </MainStateContext.Provider>
    );
}

export function useMainState() {
    return useContext(MainStateContext);
}

export function useMainDispatch() {
    return useContext(MainDispatchContext);
}
