import { useState } from "react";
import { Container } from "react-bootstrap";
import { useItemList } from "./DataContext.js";
import ItemDisplay from "./ItemDisplay.js";
import { getNewItem } from "../Code/data.js";
import Filter from "./Filter.js";
import "../Css/App.css";

export default function App() {
    const [state] = useItemList();
    const [filterTags, setFilterTags] = useState();
    //Get a filtered list of items to show - according to the filterTags
    //Will show all if filterTags is not yet set.
    const filteredList = filterTags
        ? state.itemList.filter((item) =>
              item.tags.some((tag) => filterTags.includes(tag))
          )
        : state.itemList;
    //To be added to the bottom of the list
    const newItem = getNewItem(state.itemList);
    return (
        <div className="app">
            <div className="app-header">
                <h1>Sample Comment System</h1>
                A project created by Chaim Bainish Sommers for the Viventium recruting process
            </div>
            <Container className="app-content">
                <Filter
                    tags={filterTags}
                    onSetFilter={(fTags) => setFilterTags(fTags)}
                />
                {filteredList.map((item) => (
                    <ItemDisplay key={item.id} item={item} />
                ))}
                <ItemDisplay key={newItem.id} item={newItem} isNew={true} />
            </Container>
        </div>
    );
}
