import React, {useEffect} from 'react'
import {connect} from "react-redux";
import EditableItem from "./editable-item";
import {useParams} from "react-router-dom";
import topicActions from "../../actions/topic-actions";

const TopicPills = (
    {
        topics=[
            {_id: "123", title: "Lesson A"},
            {_id: "123", title: "Lesson B"},
            {_id: "123", title: "Lesson C"}
        ],
        findTopicsForLesson,
        createTopicForLesson,
        updateTopic,
        deleteTopic,
        cleanState
    }) => {
    const {courseId, moduleId, lessonId, topicId, layout} = useParams();
    useEffect(() => {
        console.log("LOAD TOPICS FOR LESSON: " + lessonId)
        if(lessonId !== "undefined" && typeof lessonId !== "undefined") {
            findTopicsForLesson(lessonId)
        }
        else{
            cleanState()
        }
    }, [lessonId])
    return(
        <div>
            <h4>Topics</h4>
            <ul className="nav nav-pills">
                {
                    topics.map(topic =>
                            <EditableItem
                                active={topic._id === topicId}
                                to={`/courses/${layout}/edit/${courseId}/${moduleId}/${lessonId}/${topic._id}`}
                                updateItem={updateTopic}
                                deleteItem={deleteTopic}
                                item={topic}
                                listItemType="nav-item"
                                key={topic._id}
                            />
                    )
                }
                <li>
                    <i onClick={() => createTopicForLesson(lessonId)} className="fas fa-plus btn ml-2"/>
                </li>
            </ul>
        </div>)}

const stpm = (state) => ({
    topics: state.topicReducer.topics
})
const dtpm = (dispatch) => ({
    findTopicsForLesson: (lessonId) => topicActions.findTopicsForLesson(dispatch, lessonId),
    createTopicForLesson: (lessonId) => topicActions.createTopicForLesson(dispatch, lessonId),
    deleteTopic: (item) => topicActions.deleteTopic(dispatch, item),
    updateTopic: (topic) => topicActions.updateTopic(dispatch, topic),
    cleanState: () => topicActions.cleanState(dispatch)
})

export default connect(stpm, dtpm)(TopicPills)