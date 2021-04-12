import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import quizService from "../../services/quizzes-service"

const QuizzesList = () => {
    const {courseId} = useParams();
    const [quizzes, setQuizzes] = useState([])
    useEffect(() => {
        quizService.findAllQuizzes()
            .then((quizzes) => {
                setQuizzes(quizzes)
            })
    }, [])
    return(
        <div className="container-fluid">
            <h1 className="font-weight-bold m-3">Quizzes</h1>
            <div className="list-group">
                {
                    quizzes.map((quiz) => {
                        return(
                            <div className="list-group-item"
                                 key={quiz._id}>
                                <Link
                                    to={`/courses/${courseId}/quizzes/${quiz._id}`}>
                                    {quiz.title}
                                </Link>
                                <Link
                                    className="btn btn-primary fa-pull-right"
                                    to={`/courses/${courseId}/quizzes/${quiz._id}`}>
                                    Start
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default QuizzesList;