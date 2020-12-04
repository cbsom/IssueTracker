export function itemListReducer(state, action) {
    switch (action.type) {
        case "INIT_LIST":
            return { itemList: [...action.payload] };
        case "UPDATE_ITEM":
            const updatedList = [...state.itemList];
            const index = updatedList.findIndex(
                (i) => i.id === action.payload.id
            );
            updatedList[index] = action.payload;

            return { itemList: updatedList };
        case "ADD_ITEM":
            return { itemList: [...state.itemList, action.payload] };
        case "REMOVE_ITEM":
            const filteredList = state.itemList.filter(
                (i) => i.id !== action.payload.id
            );
            return { itemList: filteredList };
        default:
            return state;
    }
}
