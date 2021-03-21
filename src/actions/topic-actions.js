import topicService from "../services/topic-service";
export const FIND_TOPICS_FOR_LESSON = "FIND_TOPICS_FOR_LESSON"
export const CREATE_TOPIC = "CREATE_TOPIC"
export const DELETE_TOPIC = "DELETE_TOPIC"
export const UPDATE_TOPIC = "UPDATE_TOPIC"
export const CLEAN_STATE = "CLEAN_STATE"

const findTopicsForLesson = (dispatch, lessonId) => {
    topicService.findTopicsForLesson(lessonId)
        .then(topics => {
            console.log(topics)
            dispatch({
                type: FIND_TOPICS_FOR_LESSON,
                topics
            })
        })
}

const createTopicForLesson = (dispatch, lessonId) => {
    topicService
        .createTopicForLesson(lessonId, {title: "New Topic"})
        .then(topic => dispatch({
            type: CREATE_TOPIC,
            topic
        }))
}

const deleteTopic = (dispatch, item) =>
    topicService.deleteTopic(item._id)
        .then(status => dispatch({
            type: DELETE_TOPIC,
            topicToDelete: item
        }))

const updateTopic = (dispatch, topic) =>
    topicService.updateTopic(topic._id, topic)
        .then(status => dispatch({
            type: UPDATE_TOPIC,
            topic
        }))

const cleanState = (dispatch) =>
    dispatch({
        type: CLEAN_STATE
    })

const topicActions = {
    findTopicsForLesson,
    createTopicForLesson,
    deleteTopic,
    updateTopic,
    cleanState
}

export default topicActions