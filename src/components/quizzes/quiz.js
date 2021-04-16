import React, {useState, useEffect} from "react";
import {useParams} from 'react-router-dom'
import Question from "./questions/question";
import questionService from "../../services/questions-service"
import quizAttemptsService from "../../services/quiz-attempts-service"

const Quiz = () => {
    const {courseId, quizId} = useParams();
    const [questions, setQuestions] = useState([]);
    const [attempt, setAttempt] = useState([]);
    // const [gradeMode, setGradeMode] = useState(false);
    useEffect(() => {
        questionService.findQuestionsForQuiz(quizId)
            .then(questions => {
                setQuestions(questions)
                setAttempt(questions)
            })
        },[])

    return(
        <div className="container-fluid">
            <h1 className="font-weight-bold m-3">Quiz {quizId}
                <button className="btn btn-danger fa-pull-right"
                        onClick={() => submitQuiz(quizId, attempt)}>
                    Submit Attempt
                </button>
            </h1>
            <ul>
                {
                    questions.map(question =>
                    <li key={question._id}>
                        <Question question={question} setAttempt={setAttempt}/>
                    </li>
                    )
                }
            </ul>
            <button className="btn btn-danger m-3"
                    onClick={() => submitQuiz(quizId, attempt)}>
                Submit Attempt
            </button>
            <br/>
        </div>
    );
}

const submitQuiz = (quizId, attempt) => quizAttemptsService.submitQuiz(quizId, attempt).then(() => alert('Submitted'))

export default Quiz;