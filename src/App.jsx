import React, {Component} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import Login from './views/Login/index'
import Index from "./views/Index";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route path='/index' component={Index}/>
        </Switch>
      </HashRouter>
    )
  }
}

export default App;
