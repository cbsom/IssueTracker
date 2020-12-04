import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useItemList } from "./DataContext.js";
import TagsList from "./TagsList.js";
import { replaceMath } from "../Code/utils.js";

function ItemView({ item, onStartEdit, onEditItem, onRemove }) {
    const { title, text, tags } = item;
    return (
        <Card className="cardView">
            <Card.Header>
                <div className="cardViewFooter">{title}</div>
            </Card.Header>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: replaceMath(text.replace('\n', '<br>')),
                        }}></span>
                </Card.Text>
                <TagsList
                    tags={tags}
                    onEditTags={(tagList) =>
                        onEditItem({ ...item, tags: tagList })
                    }
                />
            </Card.Body>
            <Card.Footer>
                <Button variant="secondary" onClick={onStartEdit}>
                    Edit
                </Button>
                &nbsp;&nbsp;
                <Button variant="secondary" onClick={onRemove}>
                    Delete
                </Button>
            </Card.Footer>
        </Card>
    );
}

function ItemEdit({ item, onEndEdit, onRemove }) {
    const { title, text } = item;
    const [editItem, setEditItem] = useState(item);
    return (
        <Card className="cardEdit">
            <Form>
                <Card.Header>
                    <h3>{editItem.title || "Add a new comment...."}</h3>
                </Card.Header>
                <Card.Body>
                    <Form.Group>
                        <Form.Label>Comment title</Form.Label>
                        <Form.Control
                            defaultValue={title}
                            onChange={(event) =>
                                setEditItem({
                                    ...editItem,
                                    title: event.target.value,
                                })
                            }
                            placeholder="Enter the comment title..."
                        />
                        <Form.Text className="text-muted">
                            Enter your comments title. No Html tags are allowed.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Comment text</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            defaultValue={text}
                            onChange={(event) =>
                                setEditItem({
                                    ...editItem,
                                    text: event.target.value,
                                })
                            }
                            placeholder="Enter your comment here..."
                        />
                        <Form.Text className="text-muted">
                            Enter your comment. Html tags are acceptable. Simple mathamatical equations will be replaced with thier sum.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Item tags</Form.Label>
                        <TagsList
                            tags={editItem.tags}
                            onEditTags={(tagList) =>
                                setEditItem({
                                    ...editItem,
                                    tags: tagList,
                                })
                            }
                        />
                        <Form.Text className="text-muted">
                            Label your comment with one or more tags. You can
                            choose from the list or add your own.
                        </Form.Text>
                    </Form.Group>
                </Card.Body>
                <Card.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => onEndEdit(editItem)}>
                        {!!item.id ? "Save Changes" : "Accept"}
                    </Button>
                    &nbsp;&nbsp;
                    <Button variant="secondary" onClick={() => onEndEdit(item)}>
                        {!!item.id ? "Revert Changes" : "Clear"}
                    </Button>
                </Card.Footer>
            </Form>
        </Card>
    );
}

export default function ItemDisplay({ item, isNew }) {
    const [state, dispatch] = useItemList();
    const [isEditMode, setIsEditMode] = useState(isNew);
    const onRemove = () => {
        dispatch({
            type: "REMOVE_ITEM",
            payload: item,
        });
    };
    const onEditItem = (item) => {
        dispatch({
            type: state.itemList.find((i) => i.id === item.id)
                ? "UPDATE_ITEM"
                : "ADD_ITEM",
            payload: item,
        });
        setIsEditMode(false);
    };
    return (
        !!item &&
        (isEditMode || isNew ? (
            <ItemEdit
                item={item}
                onEndEdit={(item) => onEditItem(item)}
                onRemove={onRemove}
            />
        ) : (
            <ItemView
                item={item}
                onStartEdit={() => setIsEditMode(true)}
                onEditItem={(item) => onEditItem(item)}
                onRemove={onRemove}
            />
        ))
    );
}
