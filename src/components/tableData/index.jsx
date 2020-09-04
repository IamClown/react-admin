import React, {Component, Fragment} from "react";
// antd
import {Table, Pagination} from 'antd'
//
import PropTypes from 'prop-types'

// api
import {getTableList} from '@/api/tableListApi'

class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responseData: [],
      pageNumber: 1,
      pageSize: 10,
      selectedRowKeys: [],
      keyWord: '',
      total: ''
    }
  }

  componentDidMount() {
    this.loadListData()
  }

  loadListData = () => {
    const {pageNumber, pageSize, keyWord} = this.state
    const params = {
      url: this.props.config.url,
      method: this.props.config.method,
      data: {
        pageNumber,
        pageSize,
        keyWord
      }
    }
    getTableList(params).then(res => {
      this.setState({
        responseData: res.data.data,
        total: res.data.total
      })
    }).catch(error => {

    })
  }
  // 分页
  handlePageChange = page => {
    this.setState({
      pageNumber: page
    }, () => {
      this.loadListData()
    })
  }
  // 复选框
  onSelectChange = selectedRowKeys => {
    this.setState({
      selectedRowKeys
    })
  }

  render() {
    const {selectedRowKeys, total, pageSize} = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    return (
      <Fragment>
        <Table
          border
          rowKey={this.props.rowKey}
          columns={this.props.config.columns}
          dataSource={this.state.responseData}
          pagination={false}
          rowSelection={rowSelection}
        />
        <Pagination defaultCurrent={1} total={total} pageSize={pageSize} onChange={this.handlePageChange}/>
      </Fragment>
    );
  }
}

TableComponent.propTypes = {
  config: PropTypes.object.isRequired,
  rowKey: PropTypes.string.isRequired
}

export default TableComponent
