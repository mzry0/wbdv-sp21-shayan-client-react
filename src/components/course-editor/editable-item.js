import React, {useState} from 'react'
import {Link} from "react-router-dom";

const EditableItem = (
    {
        to="/somewhere/to/go",
        deleteItem,
        updateItem,
        item={title: "Some Title", _id:"ABC"},
        active,
        listItemType
    }) => {
    const [editing, setEditing] = useState(false)
    const [cachedItem, setCachedItem] = useState(item)
    return (
        <li className={`${listItemType} ${(active || editing) ? 'active' : ''}`}
            key={item._id}>
            {
                !editing &&
                <span className="m-1">
                    <Link className={`nav-link ${active?'active':''} d-inline m-1`} to={to}>
                        {item.title}
                    </Link>
                    <i onClick={() => setEditing(true)} className="fas fa-edit float-right m-1 btn"/>
                </span>
            }
            {
                editing &&
                <>
                    <span className="nav-link active">
                    <input
                        className="m-1"
                        onChange={(e) =>
                            setCachedItem({
                                ...cachedItem,
                                title: e.target.value
                            })}
                        value={cachedItem.title}/>
                    <i onClick={() => {
                        setEditing(false)
                        updateItem(cachedItem)
                    }} className="fas fa-check float-right m-1 btn"/>
                    <i onClick={() => deleteItem(item)} className="fas fa-times float-right m-1 btn"/>
                    </span>
                </>
            }
        </li>
    )
};

export default EditableItem