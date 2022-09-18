import "./Victory.scss";

import React from 'react';
import { useSelector } from 'react-redux';
import Score from "../../components/score/Score";
import { useRootSelector } from "../../hooks/UseRootSelector";

const Victory: React.FC = () => {
    const { players } = useRootSelector(state => state.game);

    const winner = Object.values<any>(players).reduce((winner, player) => {
        if (player.score > winner.score) {
            return player;
        }
        return winner;
    }, { name: "Everyone", score: 0 });

    return (
        <div className="victory">
            <div className="section section-winner">
                <span className="text">{winner.name} wins!!!</span>
            </div>
            <div className="section section-score">
                <Score players={players}></Score>
            </div>
        </div>
    );
};

export default Victory;