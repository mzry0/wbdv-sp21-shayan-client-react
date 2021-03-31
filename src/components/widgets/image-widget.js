import WidgetType from "./widget-type";

const ImageWidget = ({widgetActive, widgetListItem, setWidget, editing}) => {
    return (
        <div>
            {
                editing &&
                <div>
                    <WidgetType widget={widgetActive} setWidget={setWidget}/>
                    URL
                    <input
                        onChange={(e) => setWidget({...widgetActive, url: e.target.value})}
                        value={widgetActive.url || ''}
                        className="form-control"/>
                    Height
                    <input
                        onChange={(e) => setWidget({...widgetActive, height: parseInt(e.target.value)})}
                        value={widgetActive.height || ''}
                        className="form-control"/>
                    Width
                    <input
                        onChange={(e) => setWidget({...widgetActive, width: parseInt(e.target.value)})}
                        value={widgetActive.width || ''}
                        className="form-control"/>
                </div>
            }
            {
                !editing &&
                <p>
                    <img src={widgetListItem.url}
                         height={widgetListItem.height}
                         width={widgetListItem.width}
                         alt="Not found"/>
                </p>
            }
        </div>
    )
}

export default ImageWidget