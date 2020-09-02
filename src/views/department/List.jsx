import React, {Component, Fragment} from 'react'

// antd
import {Form, Input, Button, Table, Switch} from 'antd'
// api
import {getDepartmentList} from '@/api/department'

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
      ],
      requestData: {
        pageNumber: 1,
        pageSize: 10
      },
      keyWord: '',
      selectedRowKeys: []
    }
  }

  onFinish = (value) => {
    if (value.name) {
      this.setState({
        keyWord: value.name
      })
    }
    this.getList()
  }

  componentDidMount() {
    this.getList()
  }

  getList = () => {
    const {requestData, keyWord} = this.state
    if (keyWord) {
      requestData.name = keyWord
    }
    getDepartmentList(requestData).then(res => {
      if (res.data.data) {
        this.setState({
          dataSource: res.data.data,
          total: res.data.total
        })
      }
    })
  }
  onChange = (page) => {

  }
  onSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys
    })
  }

  render() {
    const {dataSource, columns, total, selectedRowKeys} = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    const pagination = {
      total,
      pageSize: 10,
      onChange: this.onChange
    }
    return (
      <Fragment>
        <Form layout='inline' onFinish={this.onFinish}>
          <Form.Item
            label='部门名称'
            name='name'
          >
            <Input placeholder='请输入部门名称'/>
          </Form.Item>
          <Form.Item shouldUpdate={true}>
            <Button type='primary' htmlType='submit'>搜索</Button>
          </Form.Item>
        </Form>
        <Table
          rowKey='id'
          border
          dataSource={dataSource}
          columns={columns}
          pagination={{...pagination}}
          rowSelection={rowSelection}
        />
      </Fragment>
    );
  }
}

export default DepartmentList
