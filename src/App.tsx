import * as React from 'react';
import { AssetContext } from './Components/actions/Context';
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
import Loader from './Components/Common/loader';
import { useState, useEffect } from 'react';
import './App.css';
const logo: string = require("./logo.svg").default; //simple import doesn't work in tsx so using this
const { Header, Sider, Content } = Layout;

const App: React.FC = () =>  {

  const [collapsed, setCollapsed] = useState(true);
  const [asset, setAsset] = useState("RCN");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "OasisPro Matching Engine"
  }, []);

  const onAssetChange = (e:any) => {
    setLoading(prev => !prev);
    setAsset(e);
    setTimeout(() => setLoading(prev => !prev), 1500);
  }

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
        <AssetContext.Provider value={asset}>
            <Header className="site-layout-background headerStyle">
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: 'trigger',
                  onClick: () => setCollapsed(!collapsed),
                })}
                <SiteHeader onAssetChange={onAssetChange}/>
              </Header>
            <Content className='bodyContentStyle'>
            { !loading ?  <MainContent /> : <Loader /> }
            </Content>
        </AssetContext.Provider>  
      </Layout>
    </Layout> 
    </div> 
  );
}

export default App;
