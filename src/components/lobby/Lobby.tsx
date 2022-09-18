import "./Lobby.scss";

import React from 'react';

const Lobby = ({players}) => {
    return (
        <div className="lobby">
            <div className="title">Players</div>
            {Object.entries<any>(players).map(([key, player]) => {
                return (
                    <div key={key} className="player">
                        <div className="avatar">
                            <img src={player.avatar} alt={player.name} />
                        </div>
                        <div className="text">{player.name}</div>
                    </div>
                )
            })}
        </div>
    );
}

export default Lobby;