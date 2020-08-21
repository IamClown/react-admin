import React, {Component} from "react";

import LoginForm from "./LoginForm";
import RegisterForm from './RegisterForm'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchType: 'login'
    }
  }

  handleSwitch = value => {
    this.setState({
      switchType: value
    })
  }

  render() {
    return (
      <div className='form-wrap'>
        <div className='form-container'>
          <h2 className='form-title'>企业人事后台系统</h2>
          {this.state.switchType === 'login' ?
            <LoginForm handleSwitch={this.handleSwitch}/> :
            <RegisterForm handleSwitch={this.handleSwitch}/>}
        </div>
      </div>
    );
  }
}
