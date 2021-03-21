import widgetService from "../services/widget-service";

export const FIND_WIDGETS_FOR_TOPIC = "FIND_WIDGETS_FOR_TOPIC"
export const CREATE_WIDGET = "CREATE_WIDGET"
export const DELETE_WIDGET = "DELETE_WIDGET"
export const UPDATE_WIDGET = "UPDATE_WIDGET"
export const SET_ACTIVE_WIDGET = "SET_ACTIVE_WIDGET"

const findWidgetsForTopic = (dispatch, topicId) => {
    widgetService.findWidgetsForTopic(topicId)
        .then(widgets => {
            dispatch({
                type: "FIND_WIDGETS_FOR_TOPIC",
                widgets
            })
        })
}

const createWidgetForTopic = (dispatch, topicId) => {
    const newWidget = {type: "HEADING", size: 1, text: "New Widget"}
    widgetService.createWidgetForTopic(topicId, newWidget)
        .then(widget => dispatch({
            type: CREATE_WIDGET,
            widget
        }))
}

const deleteWidget = (dispatch, id) =>
    widgetService.deleteWidget(id)
        .then((status) => {
            dispatch({
                type: DELETE_WIDGET,
                widgetToDelete: id
            })
        })

const updateWidget = (dispatch, id, widget) =>
    widgetService.updateWidget(id, widget).
    then((status) => {
        dispatch({
            type: SET_ACTIVE_WIDGET,
            activeWidget: {}
        })
        dispatch({
            type: UPDATE_WIDGET,
            widget
        })
    })

const setActiveWidget = (dispatch, widget) => {
    dispatch({
        type: SET_ACTIVE_WIDGET,
        activeWidget: widget
    })
}

const widgetActions = {
    createWidgetForTopic,
    findWidgetsForTopic,
    deleteWidget,
    updateWidget,
    setActiveWidget
}

export default widgetActions