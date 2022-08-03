import React, { useEffect, useState } from 'react';
import { Col, Row, Table, Card } from 'antd';
import OrderBook from './orderBook';
import OrderForm from './orderForm';
import PortFolio from './portFolio';
import TradeActivity from './tradeActivity';
import AskOrderBook from './askOrderBook';
import '../../src/App.css';

export const ProductIds = {
  XBTUSD: 'PI_XBTUSD',
  ETHUSD: 'PI_ETHUSD'
};

const options = {
  PI_XBTUSD: [0.5,1],
  PI_ETHUSD: [0.05, 0.1, 0.25]
};

export const ProductsMap = {
  "PI_XBTUSD": "PI_ETHUSD",
  "PI_ETHUSD": "PI_XBTUSD",
}

const MainContent = () => {

    const [shareData, setSharedData] = useState({});
    const onHandleChange = (e:any) => {
      setSharedData(e);
    }
 
    const dataSource = [
        {
          key: '1',
          total: 'Spread',
          size: '',
          bid: '$40',
        }
      ];
    const columns = [
        {
          title: 'Total',
          dataIndex: 'total',
          key: 'total',
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
          },
          {
            title: 'Bid',
            dataIndex: 'bid',
            key: 'bid',
          }
      ];
    return(
    <div style={{ padding: '24' }}>
        <Row className='cardBoxShadow'>
          <Col xs={24} sm={24} md={8} lg={8} className="orderBookSpaceManage cardPaddingRight">
                <OrderBook product_id="BTC-USD" shareData={shareData} />
                {/* <Card className="site-layout-background spreadStyle">
                <Table dataSource={dataSource} columns={columns} pagination={false} />
                </Card>
                <AskOrderBook /> */}
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