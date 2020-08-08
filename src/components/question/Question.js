import './Question.scss';

import React from 'react';

const Question = (props) => {
    return (
        <div className="question">
            <div className="flavor-text">How about this question...</div>
            <div className="prompt">{props.question.prompt}</div>
        </div>
    );
};

export default Question;