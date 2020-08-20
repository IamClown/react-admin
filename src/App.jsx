import React, {Component, Fragment} from 'react';
import { Route } from 'react-router-dom';

import Login from './views/Login/index'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <Fragment>
        <Route path='/' component={Login}/>
      </Fragment>
    )
  }
}

export default App;
