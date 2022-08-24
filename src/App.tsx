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
import { ApiUrl } from './Components/Helpers/Constants';
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
    //console.log("00");
    if( location.pathname === ApiUrl.base && !localStorage.getItem('token') ){
      setLogedIn(false);
      navigate(ApiUrl.login);
    }else if(location.pathname === ApiUrl.base && localStorage.getItem('token')){
      setLogedIn(true);  
    }
    else if(location.pathname === ApiUrl.login && !localStorage.getItem('token')){
      setLogedIn(false);  
    }
    else if(location.pathname === ApiUrl.login && localStorage.getItem('token')){
      setLogedIn(true);
      navigate(ApiUrl.base);
      }
    // else{
    //   console.log("Else");
    //   setLogedIn(false);
    // }
   //console.log(logedIn);
   console.log("Entry point");
   setTimeout(() => setLoading(prev => !prev), 500);
   setLoading(prev => !prev);
  }, [location]);

  const onAssetChange = (e:any) => {
    setLoading(prev => !prev);
    setAsset(e);
    setTimeout(() => setLoading(prev => !prev), 500);
  }

  return (
   
    <div className='' id="components-layout-demo-custom-trigger">
      <Routes>
        <Route path="login" element={<Login />} /> 
      </Routes> 
     {  logedIn && <Layout>
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
            <Routes>
              <Route path="/" element={<MainContent loader={loading}/>} /> 
            </Routes>
            </Content>
        </AssetContext.Provider>  
      </Layout>
    </Layout> }
    </div> 
  );
}

export default App;
