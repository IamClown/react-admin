import React, {Component, Fragment} from 'react'

// antd
import {Button, Switch} from 'antd'

// component
import TableComponent from '@/components/tableData'

class DepartmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      columns: [
        {key: 'name', title: '部门名称', dataIndex: 'name'},
        {
          key: 'status', title: '禁启用', dataIndex: 'status', render: (text, rowData) => {
            return <Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={
              rowData.status === '1'
            }/>
          }
        },
        {key: 'number', title: '人员数量', dataIndex: 'number'},
        {
          key: 'operation', title: '操作', width: '200px', render: (text, rowData) => {
            return (
              <div className='inline-btn'>
                <Button type='primary'>编辑</Button>
                <Button>删除</Button>
              </div>
            )
          }
        }
      ]
    }
  }

  render() {
    const {columns} = this.state
    const config = {
      columns,
      method: 'post',
      url: 'departmentList'
    }
    return (
      <Fragment>
        {/*<Form layout='inline' onFinish={this.onFinish}>
          <Form.Item
            label='部门名称'
            name='name'
          >
            <Input placeholder='请输入部门名称'/>
          </Form.Item>
          <Form.Item shouldUpdate={true}>
            <Button type='primary' htmlType='submit'>搜索</Button>
          </Form.Item>
        </Form>*/}
        <TableComponent config={config} rowKey='id'/>
      </Fragment>
    );
  }
}

export default DepartmentList
