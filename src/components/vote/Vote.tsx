import './Vote.scss';

import React from 'react';
import { Guesses } from '../../models/Guesses';

const Vote = ({guess, readOnly, handleChange}) => {
    return (
        <div className="vote">
            <div className="choices">
                <div className={`choice${Guesses.MuchHigher === guess ? " active" : ""}${readOnly ? " read-only" : ""}`} onClick={() => handleChange(Guesses.MuchHigher)}>
                    <i className="fas fa-angle-double-up" title={Guesses.MuchHigher}></i>
                </div>
                <div className={`choice${Guesses.Higher === guess ? " active" : ""}${readOnly ? " read-only" : ""}`} onClick={() => handleChange(Guesses.Higher)}>
                    <i className="fas fa-angle-up" title={Guesses.Higher}></i>
                </div>
                <div className={`choice${Guesses.Lower === guess ? " active" : ""}${readOnly ? " read-only" : ""}`} onClick={() => handleChange(Guesses.Lower)}>
                    <i className="fas fa-angle-down" title={Guesses.Lower}></i>
                </div>
                <div className={`choice${Guesses.MuchLower === guess ? " active" : ""}${readOnly ? " read-only" : ""}`} onClick={() => handleChange(Guesses.MuchLower)}>
                    <i className="fas fa-angle-double-down" title={Guesses.MuchLower}></i>
                </div>
            </div>
        </div>
    );
};

export default Vote;