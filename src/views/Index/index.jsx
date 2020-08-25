import React, {Component} from 'react'
//antd
import {Layout} from 'antd'

// component
import LayoutAside from "./components/Aside";
import LayoutHeader from "./components/Header";
// scss
import './layout.scss'

const {Sider, Header, Content} = Layout


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <Layout className='layout-wrap'>
          <Header className='layout-header'>
            <LayoutHeader/>
          </Header>
          <Layout>
            <Sider width='250px'>
              <LayoutAside/>
            </Sider>
            <Content className='layout-main'>内容</Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default Index
