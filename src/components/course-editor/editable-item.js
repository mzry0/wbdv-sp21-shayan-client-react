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
                <>
                    <Link className={`nav-link ${active?'active':''} d-inline`} to={to}>
                        {item.title} {JSON.stringify(active)}
                    </Link>
                    <i onClick={() => setEditing(true)} className="fas fa-edit float-right"/>
                </>
            }
            {
                editing &&
                <>
                    <span className="nav-link active">
                    <input
                        onChange={(e) =>
                            setCachedItem({
                                ...cachedItem,
                                title: e.target.value
                            })}
                        value={cachedItem.title}/>
                    <i onClick={() => {
                        setEditing(false)
                        updateItem(cachedItem)
                    }} className="fas fa-check float-right"/>
                    <i onClick={() => deleteItem(item)} className="fas fa-times float-right"/>
                    </span>
                </>
            }
        </li>
    )
};

export default EditableItem