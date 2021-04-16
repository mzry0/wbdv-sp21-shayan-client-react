const QUIZZES_URL = 'http://localhost:3000/api/quizzes';
const findAttemptsForQuiz = (qid) => {
    return fetch(`${QUIZZES_URL}/${qid}/attempts`)
        .then(response => response.json())
}
const submitQuiz = (quizId, questions) => {
    return fetch(`${QUIZZES_URL}/${quizId}/attempts`, {
        method: 'POST',
        body: JSON.stringify(questions),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
}

export default {
    findAttemptsForQuiz, submitQuiz
}
