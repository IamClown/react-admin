import React, {Component} from 'react'
// antd
import {Button} from "antd";
// api
import {getCode} from "../../api/account";

import {validateEmail} from '../../utils/validate'

class Code extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      code_btn_loading: false,
      code_btn_disable: true,
      code_btn_text: '获取验证码'
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
  }

  static getDerivedStateFromProps(prop, state) {
    if(validateEmail(prop.username)) {
      return {
        ...state,
        code_btn_disable: false,
        username: prop.username
      }
    }
    return null
  }

  handleGetCode = () => {
    this.setState({
      code_btn_loading: true,
      code_btn_text: '发送中',
      code_btn_disable: true
    })
    console.log(this.state.code_btn_disable, 'code_btn_disable')
    const data = {
      username: this.state.username,
      module: 'login'
    }
    getCode(data).then(res => {
      console.log(res);
      this.countDown()
    }).catch(error => {
      this.setState({
        code_btn_loading: false,
        code_btn_text: '重新获取'
      })
    })
  }
  // 倒计时
  countDown = () => {
    let second = 60,
      timer = null
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
