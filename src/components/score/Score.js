import './Score.scss';
import Avatar from '../../assets/avatar.svg';

import React from 'react';

const Score = (props) => {
    return (
        <div className="score">
            <div className="title">Scoreboard</div>
            {Object.entries(props.players).map(([key, player]) => {
                return (
                    <div key={key} className="player-score">
                        <img src={Avatar} alt="Avatar" />
                        <div className="text">{player.name} - {player.score}</div>
                    </div>
                )
            })}
        </div>
    );
};

export default Score;