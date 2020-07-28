import React from 'react';

const Question = (props) => {
    return (
        <div className="question">
            <h3>Question</h3>
            <div>{props.question}</div>
        </div>
    );
};

export default Question;