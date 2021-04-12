import React, {useState} from "react";

const MultipleChoiceQuestion = ({question}) => {
    const [answer, setAnswer] = useState(null)
    const [isGradeMode, setIsGradeMode] = useState(false)
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null)
    return(
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
            {
                question.choices.map((choice, i) => {
                    return(
                        <div key={i} className={isGradeMode ?
                            listItemClass(question, answer, isAnswerCorrect, choice) : "list-group-item"}>
                            <label>
                                <input type="radio"
                                       disabled={isGradeMode}
                                       className="mr-2"
                                       onClick={() => setAnswer(choice)}
                                       name={question._id}/>
                                {choice}
                            </label>
                            <i className={isGradeMode ?
                                iconTypeClass(question, answer, isAnswerCorrect, choice) : ""}/>
                        </div>
                    )
                })
            }
            <div className="mt-3 mb-3">Your Answer : {answer !== null ? answer : ''}</div>
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

const iconTypeClass = (question, answer, isAnswerCorrect, currentOption) => {
    if (currentOption === question.correct){
        return "fas fa-check fa-pull-right"
    }
    else if (!isAnswerCorrect && currentOption !== question.correct && answer === currentOption){
        return "fas fa-times fa-pull-right"
    }
    else return ""
}

const listItemClass = (question, answer, isAnswerCorrect, currentOption) => {
    if (currentOption === question.correct){
        return "list-group-item list-group-item-success"
    }
    else if (!isAnswerCorrect && currentOption !== question.correct && answer === currentOption){
        return "list-group-item list-group-item-danger"
    }
    else return "list-group-item"
}
//question has been answered and answered correctly
const answerCorrect = (question, answer) => (answer != null) && answer === question.correct
//question has been answered but answered incorrectly
const answerWrong = (question, answer) => (answer != null) && answer !== question.correct

export default MultipleChoiceQuestion;