import React, { useEffect } from "react";
import { getInitalData } from "../Code/data";
import { itemListReducer } from "../Code/itemListReducer";

/**********************************************************************************
 * The global item list is stored in a DataContext and the access to this list is only done through the itemListReducer.
 * Two contexts are set - one for the data itself, and one for the dispatcher of the reducer.
 * For convinience, they are combined into a single component - ItemListProvider.
 * The state and dispatch are combined into a single custom hook "useItemList".
 * *******************************************************************************/
const ItemListStateContext = React.createContext();
const ItemListDispatchContext = React.createContext();

function ItemListProvider({ children }) {
    const [state, dispatch] = React.useReducer(itemListReducer, {
        itemList: [],
    });

    //Because the initial data is aqcuired from an async call to the "api",
    //we will use useEffect and update the state using the reducer's dispatch function.
    useEffect(() => {
        const getData = async () => {
            const initialData = await getInitalData();
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
        React.useContext(ItemListStateContext),
        React.useContext(ItemListDispatchContext),
    ];
}

export { ItemListProvider, useItemList };
