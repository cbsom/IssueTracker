import React, { useState } from "react";
import { Button, Badge } from "react-bootstrap";
import TagsListCombo from "./TagsListCombo.js";

export default function TagsList({ tags, onEditTags }) {
    const [tagAdd, setTagAdd] = useState(null);
    return (
        <>
            {tags.map((t) => (
                <Badge
                    className={`badge-${t}`}
                    variant="secondary"
                    key={t}
                    title="Click to remove this tag"
                    onClick={() => onEditTags(tags.filter((tg) => tg !== t))}>
                    {t}
                </Badge>
            ))}
            <TagsListCombo
                onTextChange={setTagAdd}
                onTagSelected={(value) => {
                    if (value && tags.indexOf(value) === -1) {
                        onEditTags([...tags, value]);
                        setTagAdd("");
                    }
                }}
                value={tagAdd}
            />
            &nbsp;&nbsp;
            <Button className="btn-sm"
                variant="light"
                onClick={() => {
                    if (tagAdd && tags.indexOf(tagAdd) === -1) {
                        onEditTags([...tags, tagAdd]);
                        setTagAdd("");
                    }
                }}>
                Add
            </Button>
        </>
    );
}
