import React, {Component} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
// 组件
import Login from './views/login/index'
import Index from "./views/index/index.jsx";

// 私有化路由
import PrivateRouter from "./components/privateRouter";

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
