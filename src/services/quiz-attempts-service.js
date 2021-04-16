const QUIZZES_URL = 'http://localhost:3000/api/quizzes';
const findAttemptsForQuiz = (qid) => {
    return fetch(`${QUIZZES_URL}/${qid}/attempts`)
        .then(response => response.json())
}
const findQuizById = (qid) => {
    return fetch(`${QUIZZES_URL}/${qid}`)
        .then(response => response.json())
}
export default {
    findAttemptsForQuiz, findQuizById
}
