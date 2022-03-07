import './Meter.scss';

import React from 'react';
import PercentIcon from '../../assets/percent-blue.svg';

const Meter = ({value, readOnly, handleConfirm, handleChange}) => {
    return (
        <div className="meter">
            <div className="input">
                <input className="guess-input" type="number" min="0" max="100" value={value} disabled={readOnly} onChange={(event) => handleChange(Number(event.target.value))} />
                <img src={PercentIcon} alt="percent" />
            </div>
            {!readOnly &&
                <div className="confirm">
                    <button onClick={handleConfirm}>Confirm</button>
                </div>
            }
        </div>
    );
};

export default Meter;