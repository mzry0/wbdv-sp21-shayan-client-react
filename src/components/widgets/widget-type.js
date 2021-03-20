import React, {useState, useEffect} from 'react'

const WidgetType = ({widget, setWidget}) => {
    return (
        <div>
            <select onChange={(e) => {
                        console.log("widget-type onChange called")
                        setWidget(
                            widget => ({...widget, type: e.target.value}))
                        }}
                    value={widget.type}
                    className="form-control">
                <option value={"HEADING"}>Heading</option>
                <option value={"PARAGRAPH"}>Paragraph</option>
            </select>
        </div>
    )
}

export default WidgetType