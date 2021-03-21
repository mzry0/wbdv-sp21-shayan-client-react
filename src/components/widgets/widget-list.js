import React, {useState, useEffect} from 'react'
import {connect} from "react-redux";
import HeadingWidget from "./heading-widget";
import ParagraphWidget from "./paragraph-widget";
import {useParams} from "react-router-dom"
import widgetActions from "../../actions/widget-actions";

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
    findWidgetsForTopic: (topicId) => widgetActions.findWidgetsForTopic(dispatch, topicId),
    createWidgetForTopic: (topicId) => widgetActions.createWidgetForTopic(dispatch, topicId),
    deleteWidget: (id) => widgetActions.deleteWidget(dispatch, id),
    updateWidget: (id, widget) => widgetActions.updateWidget(dispatch, id, widget),
    setActiveWidget: (widget) => widgetActions.setActiveWidget(dispatch, widget)
})

export default connect(stpm, dtpm)(WidgetList)