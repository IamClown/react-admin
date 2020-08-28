import React, {Component} from "react";
import {Switch} from "react-router-dom";
//私有化路由
import PrivateRouter from "../privateRouter";
import routerList from "./components";

class ContainerMain extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <Switch>
          {
            routerList.map(item => {
              return <PrivateRouter exact path={item.path} key={item.path} component={item.component}/>
            })
          }
        </Switch>
      </div>
    );
  }
}

export default ContainerMain
