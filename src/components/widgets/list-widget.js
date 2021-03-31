import WidgetType from "./widget-type";
import React from "react";

const ListWidget = ({widgetActive, widgetListItem, setWidget, editing}) => {
    return (
        <div>
            {
                editing &&
                <div>
                    <WidgetType widget={widgetActive} setWidget={setWidget}/>
                    <br/>
                    <input type="checkbox"
                           checked={widgetActive.ordered === undefined? false : widgetActive.ordered}
                           onChange={(e) => {
                               console.log(e.target.checked)
                               setWidget({...widgetActive, ordered: (e.target.checked)})
                           }}/> Ordered
                    <div className="mt-3 mb-3">
                    Enter one list item per line.
                    </div>
                    <textarea
                        rows={10}
                        placeholder="Enter one list item per line."
                        onChange={(e) => setWidget({...widgetActive, text: e.target.value})}
                        value={widgetActive.text}
                        className="form-control"/>
                </div>
            }
            {
                !editing &&
                <>
                    {
                        widgetListItem.ordered &&
                            <ol>
                                {
                                    widgetListItem.text.split("\n").map((item, i) => {
                                        return(
                                            <li key={i}>{item}</li>
                                        )
                                    })
                                }
                            </ol>
                    }
                    {
                        !widgetListItem.ordered &&
                        <ul>
                            {
                                widgetListItem.text.split("\n").map((item, i) => {
                                    return(
                                        <li key={i}>{item}</li>
                                    )
                                })
                            }
                        </ul>
                    }
                </>
            }
        </div>
    )
}

export default ListWidget
