import React, {Component} from 'react'
//antd
import {Layout} from 'antd'

// component
import LayoutAside from "./components/Aside";
import LayoutHeader from "./components/Header";
import ContainerMain from "../../components/containerMain";
// scss
import './layout.scss'

const {Sider, Header, Content} = Layout


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    }
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render() {
    const {collapsed} = this.state
    return (
      <div>
        <Layout className='layout-wrap'>
          <Header className='layout-header'>
            <LayoutHeader collapsed={collapsed} toggleCollapsed={this.toggleCollapsed}/>
          </Header>
          <Layout>
            <Sider width='250px' collapsed={collapsed}>
              <LayoutAside/>
            </Sider>
            <Content className='layout-main'>
              <ContainerMain/>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default Index
