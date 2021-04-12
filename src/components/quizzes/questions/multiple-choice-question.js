import React, {useState} from "react";

const MultipleChoiceQuestion = ({question}) => {
    const [answer, setAnswer] = useState(null)
    return(
        <div className="container-fluid mt-4 mb-4">
            <h4>
                {question.question}
                {
                    answer && answer === question.correct &&
                    <i className="fas fa-check"/>
                }
                {
                    answer && answer !== question.correct &&
                    <i className="fas fa-times"/>
                }
            </h4>
            {
                question.choices.map((choice, i) => {
                    return(
                        <label key={i} className="list-group-item">
                            <input type="radio"
                                   className="mr-2"
                                   onClick={() => setAnswer(choice)}
                                   name={question._id}/>
                            {choice}
                        </label>
                    )
                })
            }
        </div>
    )
}

export default MultipleChoiceQuestion;