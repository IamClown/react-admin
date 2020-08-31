import React, {Component, Fragment} from 'react'

// antd
import {Form, Input, Button, InputNumber, Radio, message} from 'antd'
// api
import {addDeparment} from '../../api/department'

class DepartmentAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formLayout: {
        labelCol: {span: 2},
        wrapperCol: {span: 14}
      },
      loading: false
    }
  }

  onSubmit = (value) => {
    if (!value.name) {
      return message.error('部门名称不能为空')
    }
    if (!value.number) {
      return message.error('人员数量不能为0')
    }
    if (!value.content) {
      return message.error('描述不能为空')
    }
    this.setState({
      loading: true
    })
    addDeparment(value).then(res => {
      this.setState({
        loading: false
      })
      this.form.resetFields()
      message.success(res.message)
    }).catch(error => {
      this.setState({
        loading: false
      })
      message.error(error)
    })
  }

  render() {
    return (
      <Fragment>
        <Form
          {...this.state.formLayout}
          onFinish={this.onSubmit}
          initialValues={{
            number: 0,
            status: true
          }}
          ref={form => this.form = form}
        >
          <Form.Item name='name' label='部门名称'>
            <Input/>
          </Form.Item>
          <Form.Item name='number' label='人员数量'>
            <InputNumber min={0} max={100} style={{width: '100%'}}/>
          </Form.Item>
          <Form.Item name='status' label='禁启用'>
            <Radio.Group style={{width: '100%'}}>
              <Radio value={true} style={{width: '40%'}}>启用</Radio>
              <Radio value={false} style={{width: '40%'}}>禁用</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name='content' label='描述'>
            <Input.TextArea/>
          </Form.Item>
          <Form.Item wrapperCol={{...this.state.formLayout.wrapperCol, offset: 8}}>
            <Button htmlType='submit' type='primary' loading={this.state.loading}>提交</Button>
          </Form.Item>
        </Form>
      </Fragment>
    );
  }
}

export default DepartmentAdd
