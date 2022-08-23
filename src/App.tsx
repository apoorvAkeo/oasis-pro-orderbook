import * as React from 'react';
import { AssetContext } from './Components/actions/Context';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreFilled,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';

import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import SiteHeader from './Components/Common/header';
import MainContent from './Components/mainContent';
// import './scss/style.scss';
import { useState, useEffect } from 'react';
import Login from './Components/Login'
import './App.css';
const logo: string = require("./logo.svg").default; //simple import doesn't work in tsx so using this
const { Header, Sider, Content } = Layout;

const App: React.FC = () =>  {
  const location = useLocation();
  let navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(true);
  const [asset, setAsset] = useState("RCN");
  const [loading, setLoading] = useState(false);
  const [logedIn, setLogedIn] = useState(true);

  useEffect(() => {
    document.title = "OasisPro Matching Engine"
  }, []);

  // Check if logged in
  useEffect(() => {
    if ( !localStorage.getItem('loggedIn') || !localStorage.getItem('token')) {
        navigate('/login');
        setLogedIn(false);
    }else{
      if (location.pathname == '/login' && localStorage.getItem('token')) {
        navigate('/');
      }
      setTimeout(() => setLoading(prev => !prev), 500); 
    }
    setLoading(prev => !prev);
  }, []);

  const onAssetChange = (e:any) => {
    setLoading(prev => !prev);
    setAsset(e);
    setTimeout(() => setLoading(prev => !prev), 500);
  }

  return (
   
    <div className='' id="components-layout-demo-custom-trigger">
     {  logedIn ? <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo innerLogo">
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
             <MainContent loader={loading}/>
            </Content>
        </AssetContext.Provider>  
      </Layout>
    </Layout>  :  <Routes>
                    <Route path="login" element={<Login />} />
                    {/* {siteRoutes.map(({ path, ComponentIn }, key: number) => {
                      return <Route key={key} path={path} element={<ComponentIn />} />;
                    })} */}
                  </Routes> }
    </div> 
  );
}

export default App;
