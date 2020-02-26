import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { RenderPeople } from './components/people';
import { RenderFavorite } from './components/favorite';

const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={RenderPeople} />
      <Route path="/favorite" component={RenderFavorite} />
    </Switch>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
