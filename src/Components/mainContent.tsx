import React, { useState, useEffect } from 'react';
import { Col, Row, notification } from 'antd';
import OrderBook from './orderBook';
import OrderForm from './orderForm';
import PortFolio from './portFolio';
import TradeActivity from './tradeActivity';
import '../../src/App.css';

const MainContent = () => {

    const [shareData, setSharedData] = useState({});
    const onHandleChange = (e:any) => {
      setSharedData(e);
    }
    
    
    function showNotificationPopup(){
      notification.success({
        message: `Notification`,
        description: `Notification After 2 second`,
        placement: 'topRight',
        className: 'notificationMsgContainer'
        });
     }

      // useEffect(() => {
      //   const timer = setInterval(() => {
      //     showNotificationPopup();
      //   }, 3000); 

      //   return function stopTimer() {
      //     clearInterval(timer)
      //   }
      // });

    return(
    <div style={{ padding: '24' }}>
        <Row className='cardBoxShadow'>
          <Col xs={24} sm={24} md={8} lg={8} className="orderBookSpaceManage cardPaddingRight">
                <OrderBook product_id="BTC-USD" shareData={shareData} />
          </Col>
          <Col  xs={24} sm={24} md={16} lg={16}>
              <Row className='setCardMinHeight'>
                <Col xs={24} sm={24} md={12} lg={12} className="cardPaddingRight mbPaddingTop">
                  <OrderForm onHandleChange={onHandleChange}/>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} className="mbPaddingTop portfolioWrapper">
                  <PortFolio shareData={shareData}/>
                </Col>
              </Row>
              <Col xs={24} sm={24} md={24} lg={24} className="tradeActivTopPading">
                <TradeActivity shareData={shareData}/>  
              </Col>
          </Col>
        </Row>
    </div>
    );

}
export default MainContent;