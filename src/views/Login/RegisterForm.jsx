import React, {Component, Fragment} from "react";
import PropTypes from 'prop-types'
import './index.scss'

import {Form, Button, Input, Row, Col} from "antd";
import {UserOutlined, LockOutlined} from '@ant-design/icons';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  static props = {
    handleSwitch: PropTypes.func.isRequired
  }

  onFinish = (value) => {
    console.log(value, 'value')
  }
  changeToLogin = () => {
    this.props.handleSwitch('login')
  }

  render() {
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
          <Form.Item name="username" rules={[{required: true, message: 'Please input your Username!'}]}>
            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
          </Form.Item>
          <Form.Item name="password" rules={[{required: true, message: 'Please input your Password!'}]}>
            <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>} placeholder="Password"/>
          </Form.Item>
          <Form.Item name="confirmPassword" rules={[{required: true, message: 'Please input your confirm password!'}]}>
            <Input prefix={<LockOutlined className="site-form-item-icon"/>} placeholder="Confirm password"/>
          </Form.Item>
          <Form.Item name="verificationCode"
                     rules={[{required: true, message: 'Please input your verification code!'}]}>
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
              注册
            </Button>
          </Form.Item>
        </Form>
      </Fragment>
    );
  }
}

export default RegisterForm
