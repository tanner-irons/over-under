import './Meter.scss';
import Percent from '../../assets/percent-blue.svg';

import React from 'react';

const Meter = (props) => {
    return (
        <div className="meter">
            <input className="guess-input" type="number" min="0" max="100" value={props.data.percentage} onChange={(event) => props.handleChange(event.target.value)} />
            <img src={Percent} alt="percent" />
        </div>
    );
};

export default Meter;