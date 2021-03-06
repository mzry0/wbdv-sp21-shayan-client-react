const QUIZZES_URL = 'https://wbdv-sp21-shayan-server-node.herokuapp.com/api/quizzes';
// const QUIZZES_URL = 'http://localhost:3000/api/quizzes';

const findAllQuizzes = () => {
    return fetch(QUIZZES_URL)
        .then(response => response.json())
}
const findQuizById = (qid) => {
    return fetch(`${QUIZZES_URL}/${qid}`)
        .then(response => response.json())
}
export default {
    findAllQuizzes, findQuizById
}
