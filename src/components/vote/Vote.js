import './Vote.scss';

import React from 'react';
import { Guesses } from '../../models/Guesses';

const Vote = (props) => {
    return (
        <div className="vote">
            <div className="choices">
                <div className={`choice${Guesses.MuchHigher === props.guess ? " active" : ""}${props.readOnly ? " read-only" : ""}`} onClick={() => props.handleChange(Guesses.MuchHigher)}>
                    <i className="fas fa-angle-double-up" title={Guesses.MuchHigher}></i>
                </div>
                <div className={`choice${Guesses.Higher === props.guess ? " active" : ""}${props.readOnly ? " read-only" : ""}`} onClick={() => props.handleChange(Guesses.Higher)}>
                    <i className="fas fa-angle-up" title={Guesses.Higher}></i>
                </div>
                <div className={`choice${Guesses.Lower === props.guess ? " active" : ""}${props.readOnly ? " read-only" : ""}`} onClick={() => props.handleChange(Guesses.Lower)}>
                    <i className="fas fa-angle-down" title={Guesses.Lower}></i>
                </div>
                <div className={`choice${Guesses.MuchLower === props.guess ? " active" : ""}${props.readOnly ? " read-only" : ""}`} onClick={() => props.handleChange(Guesses.MuchLower)}>
                    <i className="fas fa-angle-double-down" title={Guesses.MuchLower}></i>
                </div>
            </div>
        </div>
    );
};

export default Vote;