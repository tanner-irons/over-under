import './AvatarSelect.scss';

import React, { useState } from 'react';

import Wolverine from '../../assets/wolverine.svg';
import WonderWoman from '../../assets/wonder-woman.svg';
import Ironman from '../../assets/ironman.svg';
import Batman from '../../assets/batman.svg';
import CaptainAmerica from '../../assets/captain-america.svg';
import Yoda from '../../assets/yoda.svg';
import Anonymous from '../../assets/anonymous.svg';
import Avatar from '../../assets/avatar.svg';
import BabyYoda from '../../assets/baby-yoda.svg';
import Bender from '../../assets/bender.svg';
import DarthVader from '../../assets/darth-vader.svg';
import Deadpool from '../../assets/deadpool.svg';
import Fry from '../../assets/fry.svg';
import Gremlin from '../../assets/gremlin.svg';
import Groot from '../../assets/groot.svg';
import HarleyQuinn from '../../assets/harley-quinn.svg';
import Hulk from '../../assets/hulk.svg';
import Joker from '../../assets/joker.svg';
import Leela from '../../assets/leela.svg';
import Mystique from '../../assets/mystique.svg';
import NinjaTurtle from '../../assets/ninja-turtle.svg';
import Pennywise from '../../assets/pennywise.svg';
import R2D2 from '../../assets/r2d2.svg';
import Rick from '../../assets/rick.svg';
import Spiderman from '../../assets/spiderman.svg';
import Walt from '../../assets/walt.svg';

export const avatars = [
    Batman,
    Joker,
    HarleyQuinn,
    WonderWoman,
    DarthVader,
    Yoda,
    BabyYoda,
    R2D2,
    Wolverine,
    Deadpool,
    Mystique,
    Pennywise,
    Rick,
    Walt,
    Spiderman,
    Ironman,
    CaptainAmerica,
    Hulk,
    Groot,
    Anonymous,
    Leela,
    Bender,
    Fry,
    Gremlin,
    Avatar,
    NinjaTurtle
];

const AvatarSelect = ({ handleChange }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const prev = () => {
        if (selectedIndex - 1 >= 0) {
            handleChange && handleChange(avatars[selectedIndex - 1]);
            setSelectedIndex(selectedIndex - 1);
        }
    };

    const next = () => {
        if (selectedIndex + 1 <= avatars.length - 1) {
            handleChange && handleChange(avatars[selectedIndex + 1]);
            setSelectedIndex(selectedIndex + 1);
        }
    };

    return (
        <div className="avatar-select">
            <i className="fas fa-chevron-left" onClick={prev}></i>
            <div className="avatar">
                <img src={avatars[selectedIndex]} alt="avatar" />
            </div>
            <i className="fas fa-chevron-right" onClick={next}></i>
        </div>
    )
};

export default AvatarSelect;
