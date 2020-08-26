import React, {Component} from "react";
import {Switch} from "react-router-dom";
//私有化路由
import PrivateRouter from "../privateRouter";
// 组件
import UserList from "../../views/User/userList";
import UserAdd from "../../views/User/userAdd";

class ContainerMain extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <Switch>
          <PrivateRouter path='/index/user/list' component={UserList}/>
          <PrivateRouter path='/index/user/add' component={UserAdd}/>
        </Switch>
      </div>
    );
  }
}

export default ContainerMain
