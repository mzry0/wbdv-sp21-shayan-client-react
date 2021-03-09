import React, {useEffect} from 'react'
import {connect} from "react-redux";
import EditableItem from "./editable-item";
import {useParams} from "react-router-dom";
import lessonService from '../../services/lesson-service'

const LessonTabs = (
    {
        lessons=[
            {_id: "123", title: "Lesson A"},
            {_id: "123", title: "Lesson B"},
            {_id: "123", title: "Lesson C"}
        ],
        findLessonsForModule,
        createLessonForModule,
        updateLesson,
        deleteLesson,
        clearLessons
    }) => {
    const {courseId, moduleId, lessonId, layout} = useParams();
    useEffect(() => {
        console.log("LOAD LESSONS FOR MODULE: " + moduleId)
        if(moduleId !== "undefined" && typeof moduleId !== "undefined") {
            findLessonsForModule(moduleId)
        }
        else{
            clearLessons()
        }
    }, [moduleId])
    return(
        <div>
            <h4>Lessons</h4>
            <ul className="nav nav-pills mt-4">
                {
                    lessons.map(lesson =>
                            <EditableItem
                                active={lesson._id === lessonId}
                                to={`/courses/${layout}/edit/${courseId}/${moduleId}/${lesson._id}`}
                                updateItem={updateLesson}
                                deleteItem={deleteLesson}
                                item={lesson}
                                listItemType="nav-item"
                                key={lesson._id}
                            />
                    )
                }
                <li>
                    <i onClick={() => createLessonForModule(moduleId)} className="fas fa-plus ml-2 btn"/>
                </li>
            </ul>
        </div>)}

const stpm = (state) => ({
    lessons: state.lessonReducer.lessons
})
const dtpm = (dispatch) => ({
    findLessonsForModule: (moduleId) => {
        console.log("LOAD LESSONS FOR MODULE:")
        console.log(moduleId)
        lessonService.findLessonsForModule(moduleId)
            .then(lessons => dispatch({
                type: "FIND_LESSONS",
                lessons
            }))
    },
    createLessonForModule: (moduleId) => {
        console.log("CREATE LESSON FOR MODULE: " + moduleId)
        lessonService
            .createLessonForModule(moduleId, {title: "New Lesson"})
            .then(lesson => dispatch({
                type: "CREATE_LESSON",
                lesson
            }))
    },
    deleteLesson: (item) =>
        lessonService.deleteLesson(item._id)
            .then(status => dispatch({
                type: "DELETE_LESSON",
                lessonToDelete: item
            })),
    updateLesson: (lesson) =>
        lessonService.updateLesson(lesson._id, lesson)
            .then(status => dispatch({
                type: "UPDATE_LESSON",
                lesson: lesson
            })),
    clearLessons: () => dispatch({
        type: "CLEAR_LESSONS"
    })
})

export default connect(stpm, dtpm)(LessonTabs)