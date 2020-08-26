import React, {Component} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
// 组件
import Login from './views/Login/index'
import Index from "./views/Index";

// 私有化路由
import PrivateRouter from "./views/Index/privateRouter";

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
          <PrivateRouter path='/index' component={Index}/>
        </Switch>
      </HashRouter>
    )
  }
}

export default App;
