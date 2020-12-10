import React, { useEffect, createContext, useContext, useReducer } from "react";
import { getInitialData } from "../Code/data";
import { itemListReducer } from "../Code/itemListReducer";

/**********************************************************************************
 * The global item list is stored in a DataContext and the access to this list is only done through the itemListReducer.
 * Two contexts are set - one for the data itself, and one for the dispatcher of the reducer.
 * For convenience, they are combined into a single component - ItemListProvider.
 * The state and dispatch are combined into a single custom hook "useItemList".
 * *******************************************************************************/
const ItemListStateContext = createContext();
const ItemListDispatchContext = createContext();

function ItemListProvider({ children }) {
    const [state, dispatch] = useReducer(itemListReducer, {
        itemList: [],
    });

    //Because the initial data is acquired from an async call to the "api",
    //we will use useEffect and update the state using the reducer's dispatch function.
    useEffect(() => {
        const getData = async () => {
            const initialData = await getInitialData();
            dispatch({ type: "INIT_LIST", payload: initialData });
        };
        getData();
    }, []);

    return (
        <ItemListStateContext.Provider value={state}>
            <ItemListDispatchContext.Provider value={dispatch}>
                {children}
            </ItemListDispatchContext.Provider>
        </ItemListStateContext.Provider>
    );
}

function useItemList() {
    return [
        useContext(ItemListStateContext),
        useContext(ItemListDispatchContext),
    ];
}

export { ItemListProvider, useItemList };
