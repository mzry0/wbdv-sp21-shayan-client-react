import {
    CREATE_WIDGET,
    DELETE_WIDGET,
    FIND_WIDGETS_FOR_TOPIC,
    SET_ACTIVE_WIDGET,
    UPDATE_WIDGET
} from "../actions/widget-actions";

const initialState = {
    widgets: [
        {id: 1, type: "PARAGRAPH"},
        {id: 2, type: "PARAGRAPH"}
    ],
    activeWidget: {}
}

const widgetReducer = (state=initialState, action) => {
    switch (action.type) {
        case FIND_WIDGETS_FOR_TOPIC:
            console.log('dispatch reached')
            console.log(action.widgets)
            return {
                ...state,
                widgets: action.widgets
            }
        case CREATE_WIDGET:
            const newState = {
                ...state,
                widgets: [
                    ...state.widgets,
                    action.widget
                ]
            }
            return newState
        case DELETE_WIDGET:
            const newState1 = {
                ...state,
                widgets: state.widgets.filter(w => {
                    if(w.id === action.widgetToDelete) {
                        return false
                    } else {
                        return true
                    }
                })
            }
            return newState1
        case UPDATE_WIDGET:
            return {
                ...state,
                widgets: state.widgets.map(w => {
                    if(w.id === action.widget.id) {
                        return action.widget
                    } else {
                        return w
                    }
                })
            }
        case SET_ACTIVE_WIDGET:
            return{
                ...state,
                activeWidget: action.activeWidget
            }
        default:
            return state
    }
}
export default widgetReducer