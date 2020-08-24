import React, {Component, Fragment} from "react";
import PropTypes from 'prop-types'
import './index.scss'
// antd
import {Form, Button, Input, Row, Col} from "antd";
import {UserOutlined, LockOutlined} from '@ant-design/icons';

import {validatePassword, validateEmail} from '../../utils/validate'
import Code from "../../components/code";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
  }

  static props = {
    handleSwitch: PropTypes.func.isRequired
  }

  onFinish = (value) => {
    console.log(value, 'value')
  }
  changeToRegister = () => {
    this.props.handleSwitch('register')
  }
  handleChange = (e) => {
    this.setState({
      username: e.target.value
    })
  }


  render() {
    const _this = this
    const {code_btn_text, code_btn_loading, code_btn_disable} = this.state
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
          <Form.Item name="Email" rules={[
            () => ({
              validator(rule, value) {
                if (value && validateEmail(value)) {
                  _this.setState({
                    code_btn_disable: false
                  })
                  return Promise.resolve()
                }
                _this.setState({
                  code_btn_disable: true
                })
                return Promise.reject("邮箱格式不正确")
              }
            })
          ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"
                   onChange={this.handleChange}/>
          </Form.Item>
          <Form.Item name="password" rules={[
            ({getFieldValue}) => ({
              validator(rule, value) {
                if (value.length < 6 || value.length > 20) {
                  return Promise.reject('密码长度必须在6~20位之间')
                }
                if (value && validatePassword(getFieldValue('password'))) {
                  return Promise.resolve()
                } else {
                  return Promise.reject('密码格式必须是数字+字母')
                }
              }
            })
          ]}>
            <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>} placeholder="Password"/>
          </Form.Item>
          <Form.Item name="verificationCode" rules={[
            {required: true, message: 'Please input your verification code!'},
            {len: 6, message: '验证码必须是6位'}
          ]}>
            <Row gutter={8}>
              <Col span='16'>
                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Verification code"/>
              </Col>
              <Col span='8'>
                <Code username={this.state.username}/>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Fragment>
    );
  }
}

export default LoginForm
