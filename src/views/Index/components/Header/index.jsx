import React, {Component} from 'react'
import {MenuFoldOutlined} from '@ant-design/icons';
import './aside.scss'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // collapsed: props.collapsed
    }
  }

  toggleMenu = () => {
    this.props.toggleCollapsed()
  }

  static getDerivedStateFromProps(props, state) {
    if (props.collapsed !== state.collapsed) {
      return {collapsed: props.collapsed}
    }
    return null
  }

  render() {
    const {collapsed} = this.state
    return (
      <div className={collapsed ? 'collapsed-close' : 'collapsed-open'}>
        <h1 className='logo'>
          <span>LOGO</span>
        </h1>
        <div className='collapsed-warp'>
          <span className='collapsed-icon' onClick={this.toggleMenu}><MenuFoldOutlined/></span>
        </div>
      </div>
    );
  }
}

export default Header
