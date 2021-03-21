import React, {useState, useEffect} from 'react'
import {connect} from "react-redux";
import HeadingWidget from "./heading-widget";
import ParagraphWidget from "./paragraph-widget";
import {useParams} from "react-router-dom"
import widgetService from "../../services/widget-service"

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
    useEffect(() => {
        findWidgetsForTopic(topicId)
    }, [topicId])

    return(
        <div>
            <i onClick={() => createWidgetForTopic(topicId)} className="fas fa-plus btn float-right"/>
            <h4>Widgets</h4>
            <ul className="list-group">
                {
                    widgets
                    &&
                    widgets.map(_widget =>
                    <li key={_widget.id} className="list-group-item">
                        {
                            _widget.id === activeWidget.id &&
                            <>
                                <i onClick={() => deleteWidget(_widget.id)} className="fas btn fa-trash float-right"/>
                                <i onClick={() => {
                                    updateWidget(_widget.id, activeWidget)
                                }} className="fas btn fa-check float-right"/>

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
                                <i onClick={() => setActiveWidget(_widget)} className="fas btn fa-cog float-right"/>
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
        const newWidget = {type: "HEADING", size: 1, text: "New Widget"}
        widgetService.createWidgetForTopic(topicId, newWidget)
            .then(widget => dispatch({
                type: "CREATE_WIDGET",
                widget
            }))
    },
    deleteWidget: (id) =>
        widgetService.deleteWidget(id)
            .then((status) => {
                dispatch({
                    type: "DELETE_WIDGET",
                    widgetToDelete: id
                })
            }),

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
        }),
    setActiveWidget: (widget) => {
        dispatch({
            type:"SET_ACTIVE_WIDGET",
            activeWidget: widget
        })
    }
})

export default connect(stpm, dtpm)(WidgetList)