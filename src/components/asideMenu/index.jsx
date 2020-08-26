import React, {Component, Fragment} from 'react'
import {Link, withRouter} from "react-router-dom";
// antd
import {Menu} from 'antd'
import {PieChartOutlined, MailOutlined} from '@ant-design/icons';
import router from "../../router";

const {SubMenu} = Menu

class AsideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: [],
      openKeys: []
    }
  }

  componentDidMount() {
    const pathname = this.props.location.pathname
    const selectPath = pathname.split('/').slice(0, -1).join('/')
    this.setState({
      openKeys: [selectPath],
      selectedKeys: [pathname]
    })
    this.selectMenuHigh([selectPath], [pathname])
  }

  // 一级菜单
  renderMenu = ({title, path}) => {
    return (
      <Menu.Item key={path} icon={<PieChartOutlined/>}>
        <Link to={path}><span>{title}</span></Link>
      </Menu.Item>
    )
  }

  // 子集菜单
  renderChildMenu = ({title, children, path}) => {
    return (
      <SubMenu key={path} icon={<MailOutlined/>} title={title}>
        {
          children && children.map(item => {
            return item.children && item.children.length > 0 ? this.renderChildMenu(item) : this.renderMenu(item)
          })
        }
      </SubMenu>
    )
  }

  selectMenu = ({item, key, keyPath, domEvent}) => {
    this.selectMenuHigh([keyPath[keyPath.length - 1]], [key])
  }
  openChange = (openKeys) => {
    this.setState({
      openKeys
    })
  }

  // 菜单高光
  selectMenuHigh = (openKeys, selectedKeys) => {
    this.setState({
      openKeys,
      selectedKeys
    })
  }

  render() {
    const {selectedKeys, openKeys} = this.state
    return (
      <Fragment>
        <Menu
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          mode="inline"
          theme="dark"
          onClick={this.selectMenu}
          onOpenChange={this.openChange}
        >
          {router && router.map(firstItem => {
            return firstItem.children && firstItem.children.length > 0 ? this.renderChildMenu(firstItem) : this.renderMenu(firstItem)
          })}
        </Menu>
      </Fragment>
    );
  }
}

export default withRouter(AsideMenu)
