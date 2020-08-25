import React, {Component, Fragment} from "react";
import PropTypes from 'prop-types'
import './index.scss'

// antd
import {Form, Button, Input, Row, Col, message} from "antd";
import {UserOutlined, LockOutlined} from '@ant-design/icons';

// 组件
import Code from "../../components/code";
// 验证
import {validateEmail, validatePassword} from "../../utils/validate";
// 加密
import CryptoJs from 'crypto-js'
// API
import {DoRegister} from '../../api/account'

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      code: '',
      confirmPassword: '',
      module: 'register',
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
    const registerData = {
      username: value.username,
      password: this.state.password,
      code: value.code
    }
    DoRegister(registerData).then(res => {
      this.setState({
        loading: false
      })
      if (!res.data.resCode) {
        message.success(res.data.message)
        this.changeToLogin()
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
  changeToLogin = () => {
    this.props.handleSwitch('login')
  }
  inputChangeUsername = (e) => {
    this.setState({
      username: e.target.value
    })
  }
  inputChangePassword = (e) => {
    this.setState({
      password: CryptoJs.MD5(e.target.value).toString()
    })
  }
  inputChangeCode = (e) => {
    this.setState({
      code: e.target.value
    })
  }
  inputChangeConfirmPassword = (e) => {
    this.setState({
      confirmPassword: e.target.value
    })
  }

  render() {
    const {username, module, loading} = this.state
    return (
      <Fragment>
        <h2>
          <span className='login'>注册</span>
          <span className='register' onClick={this.changeToLogin}>登录</span>
        </h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{remember: true}}
          onFinish={this.onFinish}
        >
          <Form.Item name="username" rules={
            [() => ({
              validator(rule, value) {
                if (value && validateEmail(value)) {
                  return Promise.resolve()
                }
                return Promise.reject("邮箱格式不正确")
              }
            })]
          }>
            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"
                   onChange={this.inputChangeUsername}/>
          </Form.Item>
          <Form.Item name="password" rules={[
            ({getFieldValue}) => ({
              validator(rule, value) {
                const passwords = getFieldValue('confirmPassword')
                if (value) {
                  if (value.length < 6 || value.length > 20) {
                    return Promise.reject('密码长度必须在6~20位之间')
                  }
                  if (!validatePassword(value)) {
                    return Promise.reject('密码格式必须是数字+字母')
                  }
                  if (passwords && value !== passwords) {
                    return Promise.reject('两次输入的密码不一致')
                  }
                  return Promise.resolve()
                }
                return Promise.reject('密码不能为空')
              }
            })
          ]
          }>
            <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>}
                            placeholder="Password" onChange={this.inputChangePassword}/>
          </Form.Item>
          <Form.Item name="confirmPassword" rules={[
            ({getFieldValue}) => ({
              validator(rule, value) {
                const password = getFieldValue('password')
                if (value) {
                  if (password && value !== password) {
                    return Promise.reject('两次输入的密码不一致')
                  }
                  return Promise.resolve()
                }
                return Promise.reject('两次输入的密码不一致')
              }
            })
          ]
          }>
            <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>}
                            placeholder="Confirm password" onChange={this.inputChangeConfirmPassword}/>
          </Form.Item>
          <Form.Item name="code"
                     rules={[
                       {required: true, message: '验证码不能为空'},
                       {len: 6, message: '验证码必须是6位'}
                     ]}>
            <Row gutter={8}>
              <Col span='16'>
                <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                       placeholder="Verification code" onChange={this.inputChangeCode}/>
              </Col>
              <Col span='8'>
                <Code username={username} module={module}/>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" loading={loading} block>
              注册
            </Button>
          </Form.Item>
        </Form>
      </Fragment>
    );
  }
}

export default RegisterForm
