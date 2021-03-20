import React, {useState, useEffect} from 'react'
import WidgetType from "./widget-type";

const ParagraphWidget = ({widgetActive, widgetListItem, setWidget, editing}) => {
    return (
        <div>
            {
                editing &&
                <div>
                    <WidgetType widget={widgetActive} setWidget={setWidget}/>
                    <textarea
                        onChange={(e) => setWidget({...widgetActive, text: e.target.value})}
                        value={widgetActive.text}
                        className="form-control"/>
                </div>
            }
            {
                !editing &&
                <p>
                    {widgetListItem.text}
                </p>
            }
        </div>
    )
};

export default ParagraphWidget