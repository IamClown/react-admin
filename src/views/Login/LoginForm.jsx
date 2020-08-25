import React, {Component, Fragment} from "react";
// 引入白名单
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import './index.scss'
// antd
import {Form, Button, Input, Row, Col, message} from "antd";
import {UserOutlined, LockOutlined} from '@ant-design/icons';

// 验证
import {validatePassword, validateEmail} from '../../utils/validate'
// 组件
import Code from "../../components/code";
// API
import {DoLogin} from '../../api/account'
// 加密
import CryptoJs from 'crypto-js'

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      code: '',
      module: 'login',
      loading: false
    }
  }

  static props = {
    handleSwitch: PropTypes.func.isRequired
  }

  onFinish = (value) => {
    this.setState({
      loading: true
    })
    const loginData = {
      username: value.username,
      code: value.code,
      password: CryptoJs.MD5(this.state.password).toString(),
    }
    DoLogin(loginData).then(res => {
      this.setState({
        loading: false
      })
      if (!res.data.resCode) {
        message.success(res.data.message)
        this.props.history.push('/index')
      } else {
        message.warning(res.data.message)
      }
    }).catch((error) => {
      this.setState({
        loading: false
      })
      message.error(error)
    })
  }
  changeToRegister = () => {
    this.props.handleSwitch('register')
  }
  inputChange = (e) => {
    this.setState({
      username: e.target.value
    })
  }
  inputChangeCode = (e) => {
    this.setState({
      code: e.target.value
    })
  }
  inputChangePassword = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  render() {
    return (
      <Fragment>
        <h2>
          <span className='login'>登录</span>
          <span className='register' onClick={this.changeToRegister}>注册</span>
        </h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{remember: true}}
          onFinish={this.onFinish}
        >
          <Form.Item name="username" rules={[
            () => ({
              validator(rule, value) {
                if (value && validateEmail(value)) {
                  return Promise.resolve()
                }
                return Promise.reject("邮箱格式不正确")
              }
            })
          ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"
                   onChange={this.inputChange}/>
          </Form.Item>
          <Form.Item name="password" rules={[
            () => ({
              validator(rule, value) {
                if (value) {
                  if (value.length < 6 || value.length > 20) {
                    return Promise.reject('密码长度必须在6~20位之间')
                  }
                  if (!validatePassword(value)) {
                    return Promise.reject('密码格式必须是数字+字母')
                  }
                  return Promise.resolve()
                }
                return Promise.reject("密码不能为空")
              }
            })
          ]}>
            <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>}
                            onChange={this.inputChangePassword} placeholder="Password"/>
          </Form.Item>
          <Form.Item name="code" rules={[
            {required: true, message: '验证码不能为空'},
            {len: 6, message: '验证码必须是6位'}
          ]}>
            <Row gutter={8}>
              <Col span='16'>
                <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                       placeholder="Verification code" onChange={this.inputChangeCode}/>
              </Col>
              <Col span='8'>
                <Code username={this.state.username} module={this.state.module}/>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={this.state.loading} className="login-form-button" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Fragment>
    );
  }
}

export default withRouter(LoginForm)
