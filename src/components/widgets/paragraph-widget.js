import React, {useState, useEffect} from 'react'
import WidgetType from "../course-editor/widget-type";

const ParagraphWidget = ({widget, setWidget, editing}) => {
    return (
        <div>
            {
                editing &&
                <div>
                    <WidgetType widget={widget} setWidget={setWidget}/>
                    <textarea
                        onChange={(e) => setWidget({...widget, text: e.target.value})}
                        value={widget.text}
                        className="form-control"/>
                </div>
            }
            {
                !editing &&
                <p>
                    {widget.text}
                </p>
            }
        </div>
    )
};

export default ParagraphWidget