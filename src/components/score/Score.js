import './Score.scss';

import React, { useRef, useEffect } from 'react';

const Score = (props) => {

    const prevScores = useRef({});

    useEffect(() => {
        Object.entries(props.players).forEach(([key, player]) => {
            prevScores.current[key] = player.score;
        });
    }, [props]);

    return (
        <div className="score">
            <div className="title">Scoreboard</div>
            {Object.entries(props.players).map(([key, player]) => {
                const updated = player.score > prevScores.current[key];
                return (
                    <div key={key} className={`player-score${updated ? ' score-updated' : ''}`}>
                        <div className="avatar">
                            <img src={player.avatar} alt={player.name} />
                        </div>
                        <div className="text">{player.name} - {player.score}</div>
                    </div>
                )
            })}
        </div>
    );
};

export default Score;