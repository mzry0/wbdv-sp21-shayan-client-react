import React, {useState, useEffect} from 'react'
import {connect} from "react-redux";
import HeadingWidget from "./heading-widget";
import ParagraphWidget from "./paragraph-widget";
import {useParams} from "react-router-dom"
import widgetService from "../../services/widget-service"
import topicService from "../../services/topic-service";

const WidgetList = ({
                        widgets,
                        activeWidget,
                        findWidgetsForTopic,
                        createWidgetForTopic,
                        deleteWidget,
                        updateWidget,
                        setActiveWidget
                    }) => {
    const {topicId} = useParams()
    // TODO: move all state handling to widgets-reducer.js
    // const [widgets, setWidgets] = useState([])
    // const [widget, setWidget] = useState({})
    useEffect(() => {
        // widgetService.findWidgetsForTopic(topicId)
        //     .then(widgets => setWidgets(widgets))
        findWidgetsForTopic(topicId)
    }, [topicId])

    // const createWidget = () => {
    //     const newWidget = {type: "HEADING", size: 2, text: "New Widget"}
    //     widgetService.createWidgetForTopic(topicId, newWidget)
    //         .then(widget => setWidgets((widgets) => [...widgets, widget]))
    // }
    //
    // const deleteWidget = (id) =>
    //     widgetService.deleteWidget(id)
    //     .then((status) => {
    //         setWidgets((widgets) => widgets.filter(w => w.id !== id))
    //     })

    // const updateWidget = (id, widget) =>
    //     widgetService.updateWidget(id, widget).
    //     then((status) => {
    //         setWidget({})
    //         setWidgets((widgets) => widgets.map(w => w.id === id ? widget : w))
    //     })

    return(
        <div>
            <i onClick={() => createWidgetForTopic(topicId)} className="fas fa-plus float-right fa-2x"/>
            <h1>Widget List {activeWidget.id}</h1>
            <ul className="list-group">
                {
                    widgets
                    &&
                    widgets.map(_widget =>
                    <li key={_widget.id} className="list-group-item">
                        {
                            _widget.id === activeWidget.id &&
                            <>
                                <i onClick={() => deleteWidget(_widget.id)} className="fas fa-trash float-right"/>
                                <i onClick={() => {
                                    updateWidget(_widget.id, activeWidget)
                                }} className="fas fa-check float-right"/>

                                {
                                    activeWidget.type === "HEADING" &&
                                    <HeadingWidget
                                        setWidget={setActiveWidget}
                                        editing={_widget.id === activeWidget.id}
                                        widgetActive={activeWidget}
                                        widgetListItem={_widget}/>
                                }
                                {
                                    activeWidget.type === "PARAGRAPH" &&
                                    <ParagraphWidget
                                        setWidget={setActiveWidget}
                                        editing={_widget.id === activeWidget.id}
                                        widgetActive={activeWidget}
                                        widgetListItem={_widget}/>
                                }
                            </>
                        }
                        {
                            _widget.id !== activeWidget.id &&
                            <div>
                                <i onClick={() => setActiveWidget(_widget)} className="fas fa-cog float-right"/>
                                {
                                    _widget.type === "HEADING" &&
                                    <HeadingWidget
                                        setWidget={setActiveWidget}
                                        editing={_widget.id === activeWidget.id}
                                        widgetActive={activeWidget}
                                        widgetListItem={_widget}/>
                                }
                                {
                                    _widget.type === "PARAGRAPH" &&
                                    <ParagraphWidget
                                        setWidget={setActiveWidget}
                                        editing={_widget.id === activeWidget.id}
                                        widgetActive={activeWidget}
                                        widgetListItem={_widget}/>
                                }
                            </div>
                        }
                    </li>
                )
                }
            </ul>
        </div>
    )}

const stpm = (state) => (
{
    widgets: state.widgetReducer.widgets,
    activeWidget: state.widgetReducer.activeWidget
})
const dtpm = (dispatch) => ({
    findWidgetsForTopic: (topicId) => {
        widgetService.findWidgetsForTopic(topicId)
            .then(widgets => {
                dispatch({
                    type: "FIND_WIDGETS_FOR_TOPIC",
                    widgets
                })
            })
    },
    createWidgetForTopic: (topicId) => {
        const newWidget = {type: "HEADING", size: 2, text: "New Widget"}
        widgetService.createWidgetForTopic(topicId, newWidget)
            .then(widget => dispatch({
                type: "CREATE_WIDGET",
                widget
            }))
    },
    // const deleteWidget = (id) =>
        // widgetService.deleteWidget(id)
        //     .then((status) => {
        //         setWidgets((widgets) => widgets.filter(w => w.id !== id))
        //     })
    deleteWidget: (id) =>
        widgetService.deleteWidget(id)
            .then((status) => {
                // setWidgets((widgets) => widgets.filter(w => w.id !== id))
                dispatch({
                    type: "DELETE_WIDGET",
                    widgetToDelete: id
                })
            }),

    // widgetService.updateWidget(id, widget).
    // then((status) => {
    //     setWidget({})
    //     setWidgets((widgets) => widgets.map(w => w.id === id ? widget : w))
    // })

    updateWidget: (id, widget) =>
        widgetService.updateWidget(id, widget).
        then((status) => {
            dispatch({
                type: "SET_ACTIVE_WIDGET",
                activeWidget: {}
            })
            dispatch({
                type: "UPDATE_WIDGET",
                widget
            })
            // setWidget({})=
            // setWidgets((widgets) => widgets.map(w => w.id === id ? widget : w))
        }),
    setActiveWidget: (widget) => {
        dispatch({
            type:"SET_ACTIVE_WIDGET",
            activeWidget: widget
        })
    }
        // topicService.updateTopic(topic._id, topic)
        //     .then(status => dispatch({
        //         type: "UPDATE_TOPIC",
        //         topic
        //     })),
    // cleanState: () =>
    //     dispatch({
    //         type: "CLEAN_STATE"
    //     })
})

export default connect(stpm, dtpm)(WidgetList)