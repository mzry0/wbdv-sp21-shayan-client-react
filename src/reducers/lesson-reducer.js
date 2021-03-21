import {CLEAR_LESSONS, CREATE_LESSON, DELETE_LESSON, FIND_LESSONS, UPDATE_LESSON} from "../actions/lesson-actions";

const initialState = {
    lessons: []
}

const lessonReducer = (state=initialState, action) => {
    switch (action.type) {
        case CREATE_LESSON:
            return {
                ...state,
                lessons: [
                    ...state.lessons,
                    action.lesson
                ]
            }
        case FIND_LESSONS:
            return {
                ...state,
                lessons: action.lessons
            }
        case DELETE_LESSON:
            // alert("delete the module " + action.moduleToDelete.title)
            const newState1 = {
                lessons: state.lessons.filter(lesson => {
                    if(lesson._id === action.lessonToDelete._id) {
                        return false
                    } else {
                        return true
                    }
                })
            }
            return newState1
        case UPDATE_LESSON:
            return {
                lessons: state.lessons.map(lesson => {
                    if(lesson._id === action.lesson._id) {
                        return action.lesson
                    } else {
                        return lesson
                    }
                })
            }
        case CLEAR_LESSONS:
            return {
                ...state,
                lessons: []
            }
        default:
            return state
    }
}

export default lessonReducer