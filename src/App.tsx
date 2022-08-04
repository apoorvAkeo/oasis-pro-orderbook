import * as React from 'react';
// import logo from 'logo.svg';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  AppstoreFilled,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import SiteHeader from './Components/Common/header';
import MainContent from './Components/mainContent';
import { useState, useEffect } from 'react';
import './App.css';
const logo: string = require("./logo.svg").default; //simple import doesn't work in tsx so using this
const { Header, Sider, Content } = Layout;

const App: React.FC = () =>  {
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    document.title = "OasisPro Orderbook"
  }, []);

  return (
    <div className='' id="components-layout-demo-custom-trigger">
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <img src={logo} />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <AppstoreFilled />,
              label: 'Menu 1',
            }
          ]}
        />
      </Sider>
      <Layout className="site-layout">
      <Header className="site-layout-background headerStyle">
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <SiteHeader/>
        </Header>
        <Content className='bodyContentStyle'>
            <MainContent />
        </Content>
      </Layout>
    </Layout>
    </div>
  );
}

export default App;
