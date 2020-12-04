import React from "react";
import Combobox from "react-widgets/lib/Combobox";
import "react-widgets/dist/css/react-widgets.css";
import { useItemList } from "./DataContext.js";
import { getAllTags } from './../Code/utils';

export default function TagsListCombo({ onTextChange, onTagSelected, value }) {
    const [state] = useItemList();
    const list = getAllTags(state.itemList);

    return (
        <div className="tagListCombo">
            <Combobox
                data={list}
                onChange={(value) => onTextChange(value)}
                onSelect={(value) => onTagSelected(value)}
                suggest={true}
                placeholder="Add a tag..."
                value={value}
            />
        </div>
    );
}
