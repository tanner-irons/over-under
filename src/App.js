import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Menu from './components/menu/Menu';
import Start from './views/start/Start';
import Game from './views/game/Game';
import Settings from './views/settings/Settings';

const App = () => {
  return (
    <BrowserRouter>
      <div className="game-space">
      <Menu></Menu>
        <Switch>
          <Route exact path="/">
            <Game></Game>
          </Route>
          <Route path="/start">
            <Start></Start>
          </Route>
          <Route path="/game">
            <Game></Game>
          </Route>
          <Route path="/settings">
            <Settings></Settings>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
