import React, {Component, Fragment} from "react";
import PropTypes from 'prop-types'
import './index.scss'

import {Form, Button, Input, Row, Col} from "antd";
import {UserOutlined, LockOutlined} from '@ant-design/icons';

import {validatePassword} from '../../utils/validate'
import {test} from '../../api/account'

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  static props = {
    handleSwitch: PropTypes.func.isRequired
  }

  onFinish = (value) => {
    console.log(value, 'value')
    test()
  }
  changeToRegister = () => {
    this.props.handleSwitch('register')
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
          <Form.Item name="Email" rules={[
            {required: true, message: 'Please input your Email!'},
            {type: "email", message: '邮箱格式不正确'}
          ]}>
            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
          </Form.Item>
          <Form.Item name="password" rules={[
            ({getFieldValue}) => ({
              validator(rule, value) {
                if (value.length < 6 || value.length > 20) {
                  return Promise.reject('密码长度必须在6~20位之间')
                }
                if (value && validatePassword.test(getFieldValue('password'))) {
                  return Promise.resolve()
                } else {
                  return Promise.reject('密码格式必须是数字+字母')
                }
              }
            })
          ]}>
            <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>} placeholder="Password"/>
          </Form.Item>
          {/*<Form.Item name="confirmPassword" rules={[{required: true, message: 'Please input your confirm password!'}]}>
              <Input prefix={<LockOutlined className="site-form-item-icon"/>} placeholder="Confirm password"/>
            </Form.Item>*/}
          <Form.Item name="verificationCode"
                     rules={[
                       {required: true, message: 'Please input your verification code!'},
                       {len: 6, message: '验证码必须是6位'}]}>
            <Row gutter={8}>
              <Col span='16'>
                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Verification code"/>
              </Col>
              <Col span='8'>
                <Button type='danger' className="login-form-button" block>
                  获取验证码
                </Button>
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
