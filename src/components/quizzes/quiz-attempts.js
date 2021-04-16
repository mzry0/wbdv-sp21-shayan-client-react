import React, {useState, useEffect} from "react"
import {useParams} from "react-router-dom";
import quizAttemptsService from "../../services/quiz-attempts-service"
const QuizAttempts = () => {
    const {quizId} = useParams()
    const [attempts, setAttempts] = useState([])
    useEffect(() => {
        quizAttemptsService.findAttemptsForQuiz(quizId)
            .then((attempts) => {
                setAttempts(attempts)
            })
    }, [])
    return (
        <div className="container-fluid m-3">
        <h1>Previous Scores(%) for Quiz {quizId}</h1>
        <ul className="list-group">
            {
                attempts && attempts.map((attempt) =>
                    <li key={attempt._id} className="list-group-item">
                        {attempt.score}
                    </li>
                )
            }
        </ul>
        </div>
    )
}

export default QuizAttempts