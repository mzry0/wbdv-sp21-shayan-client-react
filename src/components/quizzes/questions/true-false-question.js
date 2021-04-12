import React, {useState} from "react";

const TrueFalseQuestion = ({question}) => {
    const [answer, setAnswer] = useState(null)
    const [isGradeMode, setIsGradeMode] = useState(false)
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null)
    return (
        <div className="container-fluid mt-4 mb-4">
            {question.correct}
            <h4>
                {question.question}
                {/*{*/}
                {/*    answerCorrect(question, answer) &&*/}
                {/*    <i className="fas fa-check"/>*/}
                {/*}*/}
                {/*{*/}
                {/*    answerWrong(question, answer) &&*/}
                {/*    <i className="fas fa-times"/>*/}
                {/*}*/}
            </h4>
            <label className={isGradeMode ?
                listItemClass(question, answer, isAnswerCorrect, true) : "list-group-item"}>
            <input
                type="radio"
                onClick={() => setAnswer(true)}
                className="mr-2"
                name={question._id}/>
                True
            </label>
            <label className={isGradeMode ?
                listItemClass(question, answer, isAnswerCorrect, false): "list-group-item"}>
                <input
                    type="radio"
                    onClick={() => setAnswer(false)}
                    className="mr-2"
                    name={question._id}/>
                    False
            </label>

            <button className="btn btn-primary"
                    disabled={isGradeMode}
                    onClick={() => {
                        if(answer === null) return
                        setIsGradeMode(true)
                        if (answerCorrect(question, answer)) {
                            setIsAnswerCorrect(true)
                        }
                        else if (answerWrong(question, answer)) {
                            setIsAnswerCorrect(false)
                        }

                    }}>Grade</button>
        </div>
    )
}

const listItemClass = (question, answer, isAnswerCorrect, trueOrFalse) => {
    if (trueOrFalse === (question.correct === 'true')){
        return "list-group-item list-group-item-success"
    }
    else if (isAnswerCorrect && trueOrFalse !== (question.correct === 'true')){
        return "list-group-item"
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