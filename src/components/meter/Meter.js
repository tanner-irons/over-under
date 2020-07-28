import React from 'react';

const Meter = (props) => {
    return (
        <div className="meter">
            <div>Total Responses: {props.results.count}</div>
            <div>Yes: {props.results.yes}%</div>
            <div>No: {100 - props.results.yes}%</div>
        </div>
    );
};

export default Meter;