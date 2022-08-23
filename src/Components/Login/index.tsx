import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Typography, Form, Input, Button } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../Common/loader';
import restActions from '../actions/Rest';
import { appendClassOnBody, removeClassfromBody } from '../Helpers/helperFunc';
 const logo: string = require("../../logo.svg").default;
/* eslint-disable no-template-curly-in-string */
const divider =  require("../../assets/divider.png");
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!'
  },
  number: {
    range: '${label} must be between ${min} and ${max}'
  }
};

/* eslint-enable no-template-curly-in-string */

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  let navigate = useNavigate();
  // Append class on body
  useEffect(() => {
    appendClassOnBody('bgBackground');
    return function () {
      removeClassfromBody('bgBackground');
    };
  });

  useEffect(()=> {
    setError(false);
  },[email,password]);

  const onFinish = () => {
      setLoader(true);
        let config = {
          'username': email,
          'password': password
        };
        const params = new URLSearchParams(config);
        let headers = {
          headers : {
            'Content-Type' : 'application/x-www-form-urlencoded'
          }
        }
        restActions.POST('login', params, headers).then((response) => {
            if(response){
              let newToken = response['access_token'];
              window.localStorage.setItem('token', newToken);
              if(localStorage.getItem('token')){
                setLoader(false);
                localStorage.setItem('loggedIn', '1');
                window.location.href = '/';
              }
            }else{
              setLoader(false);
              setError(true);
            }
        }) 
  };

  return (
    <div className="login-container">
      { loader ? <Loader /> : null }
      <Layout className="site-layout">
        <Layout.Content>
          <Row justify="center" align="middle" className="login-inner-content">
            <Col span={24}>
              <div className="form-content">
                <div className="logo">
                  <img src={logo} alt="Site logo" />
                </div>
                <div className="login-title">
                  <Typography.Title level={3}>Login</Typography.Title>
                  <img src={divider} />
                </div>
                <div className="form">
                  <Form
                    name="nest-messages"
                    onFinish={onFinish}
                    validateMessages={validateMessages}>
                    <Form.Item
                      name="username"
                      rules={[{ required: true, message: 'Please input your Username!' }]}>
                      <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        size="large"
                        placeholder="Username"
                        onChange={(e)=> setEmail(e.target.value)}
                        autoComplete="off"
                      />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[{ required: true, message: 'Please input your Password!' }]}>
                      <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        size="large"
                        placeholder="Password"
                        onChange={(e)=> setPassword(e.target.value)}
                       
                      />
                    </Form.Item>
                    { error && <div style={{color:"red",fontSize:"12px",textAlign: "center"}}>Unauthorized User or Invalid Credentials</div> }
                    {/* <p>
                      <Link to="/">Forgot Password ?</Link>
                    </p> */}
                    <Form.Item>
                      <Button
                        size="large"
                        block
                        type="primary"
                        htmlType="submit"
                        className="login-form-button">
                        Log in
                      </Button>
                    </Form.Item>
                    {/* <p style={{ textAlign: 'center', color: '#fff' }}>
                      {' '}
                      Don&apos;t have login yet? <Link to='#'>Register now</Link>
                    </p> */}
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
          {/* </div> */}
        </Layout.Content>
        {/* <SiteFooter /> */}
      </Layout>
    </div>
  );
};

export default Login;
