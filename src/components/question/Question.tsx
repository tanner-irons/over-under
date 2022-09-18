import './Question.scss';

import React from 'react';

const Question = ({prompt}) => {
    return (
        <div className="question">
            <div className="flavor-text">How about this question...</div>
            <div className="prompt">{prompt}</div>
        </div>
    );
};

export default Question;