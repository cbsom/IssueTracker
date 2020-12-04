import { Badge } from "react-bootstrap";
import { getAllTags } from "./../Code/utils.js";
import { useItemList } from "./DataContext.js";
import Multiselect from "react-widgets/lib/Multiselect";
import "react-widgets/dist/css/react-widgets.css";

export default function Filter({ tags, onSetFilter }) {
    const [state] = useItemList();
    const allTags = getAllTags(state.itemList);
    return (
        <Multiselect
            style={{ marginBottom: 20 }}
            data={allTags}
            value={tags || allTags}
            tagComponent={({ item }) => (
                <Badge className={`badge-${item}`} variant="secondary">
                    {item}
                </Badge>
            )}
            showPlaceholderWithValues={true}
            placeholder={
                !tags || allTags.length === tags.length
                    ? "Showing all items. Remove tags to filter comment list"
                    : "Filter the comments by tag. Click here to add tags."
            }
            onChange={(value) => onSetFilter(value)}
        />
    );
}
