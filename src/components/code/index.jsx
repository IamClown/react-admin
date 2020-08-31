import React, {Component} from 'react'
// antd
import {Button, message} from "antd";
// api
import {getCode} from "../../api/account";

import {validateEmail} from '../../utils/validate'

let timer = null;

class Code extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      code_btn_loading: false,
      code_btn_disable: true,
      code_btn_text: '获取验证码',
      module: ''
    }
  }

  /*
  * 获取父组件的state，提代componentWillReceiveProps
  */
  static getDerivedStateFromProps(prop, state) {
    /*
    *  如果当前的属性和状态一样，不触发render
    */
    if (prop.username === state.username) {
      return null
    }
    if (validateEmail(prop.username)) {
      return {
        ...state,
        code_btn_disable: false,
        username: prop.username,
        module: prop.module
      }
    } else {
      return {
        ...state,
        code_btn_disable: true,
        username: prop.username,
        module: prop.module
      }
    }
  }

  handleGetCode = () => {
    this.setState({
      code_btn_loading: true,
      code_btn_text: '发送中',
      code_btn_disable: true
    })
    const data = {
      username: this.state.username,
      module: this.state.module
    }
    getCode(data).then(res => {
      if(!res.resCode) {
        message.success(res.message)
      }
      this.countDown()
    }).catch(error => {
      this.setState({
        code_btn_loading: false,
        code_btn_text: '重新获取'
      })
      message.error(error)
    })
  }

  componentWillUnmount() {
    clearInterval(timer)
  }

  // 倒计时
  countDown = () => {
    let second = 60;
    timer = setInterval(() => {
      second--;
      if (second <= 0) {
        clearInterval(timer)
        this.setState({
          code_btn_text: '重新获取',
          code_btn_disable: false
        })
        return false
      }
      this.setState({
        code_btn_text: `${second}s`,
        code_btn_loading: false,
        code_btn_disable: true
      })
    }, 1000)
  }

  render() {
    const {code_btn_loading, code_btn_disable, code_btn_text} = this.state
    return <Button type='danger' loading={code_btn_loading} className="login-form-button" block
                   onClick={this.handleGetCode} disabled={code_btn_disable}>
      {code_btn_text}
    </Button>
  }
}

export default Code
