import React, {useEffect} from 'react'
import {connect} from "react-redux";
import EditableItem from "./editable-item";
import {useParams} from "react-router-dom";
import lessonActions from "../../actions/lesson-actions";

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
    findLessonsForModule: (moduleId) => lessonActions.findLessonsForModule(dispatch, moduleId),
    createLessonForModule: (moduleId) => lessonActions.createLessonForModule(dispatch, moduleId),
    deleteLesson: (item) =>lessonActions.deleteLesson(dispatch, item),
    updateLesson: (lesson) =>lessonActions.updateLesson(dispatch, lesson),
    clearLessons: () => lessonActions.clearLessons(dispatch)
})

export default connect(stpm, dtpm)(LessonTabs)