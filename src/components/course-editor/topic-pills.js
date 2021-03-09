import React, {useEffect} from 'react'
import {connect} from "react-redux";
import EditableItem from "./editable-item";
import {useParams} from "react-router-dom";
import topicService from '../../services/topic-service'

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
                    <i onClick={() => createTopicForLesson(lessonId)} className="fas fa-plus"></i>
                </li>
            </ul>
        </div>)}

const stpm = (state) => ({
    topics: state.topicReducer.topics
})
const dtpm = (dispatch) => ({
    findTopicsForLesson: (lessonId) => {
        console.log("LOAD TOPICS FOR LESSON:")
        console.log(lessonId)
        topicService.findTopicsForLesson(lessonId)
            .then(topics => {
                console.log(topics)
                dispatch({
                    type: "FIND_TOPICS_FOR_LESSON",
                    topics
                })
            })
    },
    createTopicForLesson: (lessonId) => {
        console.log("CREATE TOPIC FOR LESSON: " + lessonId)
        topicService
            .createTopicForLesson(lessonId, {title: "New Topic"})
            .then(topic => dispatch({
                type: "CREATE_TOPIC",
                topic
            }))
    },
    deleteTopic: (item) =>
        topicService.deleteTopic(item._id)
            .then(status => dispatch({
                type: "DELETE_TOPIC",
                topicToDelete: item
            })),
    updateTopic: (topic) =>
        topicService.updateTopic(topic._id, topic)
            .then(status => dispatch({
                type: "UPDATE_TOPIC",
                topic
            })),
    cleanState: () =>
        dispatch({
            type: "CLEAN_STATE"
        })
})

export default connect(stpm, dtpm)(TopicPills)