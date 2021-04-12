import React, {useState, useEffect} from "react";
import {useParams} from 'react-router-dom'
import Question from "./questions/question";
import questionService from "../../services/questions-service"

const Quiz = () => {
    const {courseId, quizId} = useParams();
    const [questions, setQuestions] = useState([]);
    // const [gradeMode, setGradeMode] = useState(false);
    useEffect(() => {
        questionService.findQuestionsForQuiz(quizId)
            .then(questions => setQuestions(questions))
        },[])

    return(
        <div className="container-fluid">
            <h1 className="font-weight-bold m-3">Quiz {quizId}</h1>
            <ul>
                {
                    questions.map(question =>
                    <li key={question._id}>
                        <Question question={question}/>
                    </li>
                    )
                }
            </ul>
        </div>
    );
}

export default Quiz;