import React, { useState } from 'react';
import { Col, Row } from 'antd';
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
                  <PortFolio />
                </Col>
              </Row>
              <Col xs={24} sm={24} md={24} lg={24} className="tradeActivTopPading">
                <TradeActivity />  
              </Col>
          </Col>
        </Row>
    </div>
    );

}
export default MainContent;