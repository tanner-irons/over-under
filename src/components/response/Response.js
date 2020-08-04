import './Response.scss';

import React from 'react';
import { Guesses } from './../../store/game/GameReducer';

const Response = (props) => {
    return (
        <div className="response">
            <div className="choices">
                <div className={Guesses.MuchHigher === props.response ? 'choice active' : 'choice'} onClick={() => props.handleChange(Guesses.MuchHigher)}>
                    <i className="fas fa-angle-double-up" title={Guesses.MuchHigher}></i>
                </div>
                <div className={Guesses.Higher === props.response ? 'choice active' : 'choice'} onClick={() => props.handleChange(Guesses.Higher)}>
                    <i className="fas fa-angle-up" title={Guesses.Higher}></i>
                </div>
                <div className={Guesses.Lower === props.response ? 'choice active' : 'choice'} onClick={() => props.handleChange(Guesses.Lower)}>
                    <i className="fas fa-angle-down" title={Guesses.Lower}></i>
                </div>
                <div className={Guesses.MuchLower === props.response ? 'choice active' : 'choice'} onClick={() => props.handleChange(Guesses.MuchLower)}>
                    <i className="fas fa-angle-double-down" title={Guesses.MuchLower}></i>
                </div>
            </div>
        </div>
    );
};

export default Response;