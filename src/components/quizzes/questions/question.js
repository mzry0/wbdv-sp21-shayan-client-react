import React, {useState} from "react";
import TrueFalseQuestion from "./true-false-question";
import MultipleChoiceQuestion from "./multiple-choice-question";

const Question = ({question, setAttempt}) => {
    return(
        <div>
            {
                question.type === "TRUE_FALSE" &&
                <TrueFalseQuestion
                    question={question} setAttempt={setAttempt}/>
            }
            {
                question.type === "MULTIPLE_CHOICE" &&
                <MultipleChoiceQuestion
                    question={question} setAttempt={setAttempt}/>
            }
        </div>
    )
}

export default Question;