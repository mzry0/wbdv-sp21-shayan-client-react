import WidgetType from "./widget-type";
const HeadingWidget = ({widgetActive, widgetListItem, setWidget, editing}) =>
    <div>
        {
            !editing &&
            <div>
                {widgetListItem.size === 1 && <h1>{widgetListItem.text}</h1>}
                {widgetListItem.size === 2 && <h2>{widgetListItem.text}</h2>}
                {widgetListItem.size === 3 && <h3>{widgetListItem.text}</h3>}
                {widgetListItem.size === 4 && <h4>{widgetListItem.text}</h4>}
                {widgetListItem.size === 5 && <h5>{widgetListItem.text}</h5>}
                {widgetListItem.size === 6 && <h6>{widgetListItem.text}</h6>}
            </div>

        }
        {
            editing &&
            <div>
                {widgetActive.size === 1 && <h1>{widgetActive.text}</h1>}
                {widgetActive.size === 2 && <h2>{widgetActive.text}</h2>}
                {widgetActive.size === 3 && <h3>{widgetActive.text}</h3>}
                {widgetActive.size === 4 && <h4>{widgetActive.text}</h4>}
                {widgetActive.size === 5 && <h5>{widgetActive.text}</h5>}
                {widgetActive.size === 6 && <h6>{widgetActive.text}</h6>}
                <WidgetType widget={widgetActive} setWidget={setWidget}/>
                <input onChange={(e) =>
                    setWidget(widget =>
                        ({...widget, text: e.target.value})
                    )}
                       value={widgetActive.text}
                       className="form-control"/>
                <select onChange={(e) =>
                    setWidget(widget =>
                        ({...widget, size: parseInt(e.target.value)}))}
                        value={widgetActive.size}
                        className="form-control">
                    <option value={1}>Heading 1</option>
                    <option value={2}>Heading 2</option>
                    <option value={3}>Heading 3</option>
                    <option value={4}>Heading 4</option>
                    <option value={5}>Heading 5</option>
                    <option value={6}>Heading 6</option>
                </select>
            </div>
        }
    </div>

export default HeadingWidget