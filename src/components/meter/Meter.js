import './Meter.scss';

import React from 'react';
import PercentIcon from '../../assets/percent-blue.svg';

const Meter = (props) => {
    return (
        <div className="meter">
            <div className="input">
                <input className="guess-input" type="number" min="0" max="100" value={props.value} disabled={props.readOnly} onChange={(event) => props.handleChange(Number(event.target.value))} />
                <img src={PercentIcon} alt="percent" />
            </div>
            {!props.readOnly &&
                <div className="confirm">
                    <button onClick={props.handleConfirm}>Confirm</button>
                </div>
            }
        </div>
    );
};

export default Meter;