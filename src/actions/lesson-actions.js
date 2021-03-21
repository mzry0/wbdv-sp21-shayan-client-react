import lessonService from "../services/lesson-service";

export const FIND_LESSONS = "FIND_LESSONS"
export const CREATE_LESSON = "CREATE_LESSON"
export const DELETE_LESSON = "DELETE_LESSON"
export const UPDATE_LESSON = "UPDATE_LESSON"
export const CLEAR_LESSONS = "CLEAR_LESSONS"

const findLessonsForModule = (dispatch, moduleId) => {
    lessonService.findLessonsForModule(moduleId)
        .then(lessons => dispatch({
            type: FIND_LESSONS,
            lessons
        }))
}
const createLessonForModule = (dispatch, moduleId) => {
    lessonService
        .createLessonForModule(moduleId, {title: "New Lesson"})
        .then(lesson => dispatch({
            type: CREATE_LESSON,
            lesson
        }))
}
const deleteLesson = (dispatch, item) =>
    lessonService.deleteLesson(item._id)
        .then(status => dispatch({
            type: DELETE_LESSON,
            lessonToDelete: item
        }))

const updateLesson = (dispatch, lesson) =>
    lessonService.updateLesson(lesson._id, lesson)
        .then(status => dispatch({
            type: UPDATE_LESSON,
            lesson: lesson
        }))

const clearLessons = (dispatch) => dispatch({
    type: CLEAR_LESSONS
})

const lessonActions = {
    createLessonForModule,
    deleteLesson,
    updateLesson,
    findLessonsForModule,
    clearLessons
}
export default lessonActions