import React, {useState} from "react";

const TrueFalseQuestion = ({question, setAttempt}) => {
    const [answer, setAnswer] = useState(null)
    const [isGradeMode, setIsGradeMode] = useState(false)
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null)
    return (
        <div className="container-fluid mt-4 mb-4">
            <h4>
                {question.question}
                <span className="ml-2">
                    {
                        isGradeMode && isAnswerCorrect &&
                        <i className="fas fa-check text-success"/>
                    }
                    {
                        isGradeMode && !isAnswerCorrect &&
                        <i className="fas fa-times text-danger"/>
                    }
                </span>
            </h4>
            {/*TRUE OPTION*/}
            <div className={isGradeMode ?
                listItemClass(question, answer, isAnswerCorrect, true) : "list-group-item"}>
                <label>
                    <input
                        type="radio"
                        disabled={isGradeMode}
                        onClick={() => {
                            setAnswer(true)
                            setAttempt((attempt) => {
                                const curQuestion = attempt.find(q => q._id === question._id)
                                curQuestion.answer = JSON.stringify(true)
                                return attempt
                            })
                        }}
                        className="mr-2"
                        name={question._id}/>
                    True
                </label>
                <i className={isGradeMode ?
                    iconTypeClass(question, answer, isAnswerCorrect, true) : ""}/>
            </div>

            {/*FALSE OPTION*/}
            <div className={isGradeMode ?
                listItemClass(question, answer, isAnswerCorrect, false): "list-group-item"}>
                <label className="">
                    <input
                        type="radio"
                        disabled={isGradeMode}
                        onClick={() => {
                            setAnswer(false)
                            setAttempt((attempt) => {
                                const curQuestion = attempt.find(q => q._id === question._id)
                                curQuestion.answer = JSON.stringify(false)
                                return attempt
                            })
                        }}
                        className="mr-2"
                        name={question._id}/>
                        False
                </label>
                <i className={isGradeMode ?
                    iconTypeClass(question, answer, isAnswerCorrect, false) : ""}/>
            </div>
            <div className="mt-3 mb-3">Your Answer : {answer !== null ? JSON.stringify(answer) : ''}</div>
            <button className="btn btn-primary"
                    disabled={isGradeMode}
                    onClick={() => {
                        if(answer === null || isGradeMode) return
                        setIsGradeMode(true)
                        if (answerCorrect(question, answer)) {
                            setIsAnswerCorrect(true)
                        }
                        else if (answerWrong(question, answer)) {
                            setIsAnswerCorrect(false)
                        }

                    }}>Grade
            </button>
        </div>
    )
}

const iconTypeClass = (question, answer, isAnswerCorrect, trueOrFalse) => {
    if (trueOrFalse === (question.correct === 'true')){
        return "fas fa-check fa-pull-right"
    }
    else if (!isAnswerCorrect && trueOrFalse !== (question.correct === 'true')){
        return "fas fa-times fa-pull-right"
    }
    else return ""
}

const listItemClass = (question, answer, isAnswerCorrect, trueOrFalse) => {
    if (trueOrFalse === (question.correct === 'true')){
        return "list-group-item list-group-item-success"
    }
    else if (!isAnswerCorrect && trueOrFalse !== (question.correct === 'true')){
        return "list-group-item list-group-item-danger"
    }
    else return "list-group-item"
}
//question has been answered and answered correctly
// (question.correct === 'true') returns true if the correct answer is 'true' and false otherwise
const answerCorrect = (question, answer) => (answer != null) && answer === (question.correct === 'true')
//question has been answered but answered incorrectly
const answerWrong = (question, answer) => (answer != null) && answer !== (question.correct === 'true')

export default TrueFalseQuestion;