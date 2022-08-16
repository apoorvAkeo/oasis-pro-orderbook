import * as React from 'react';
import { Card } from 'antd';
import OrderBookApi from './hooks/OrderBookApi';
import OBP from './hooks/OBP';
import '../../src/App.css';

const OrderBook = ({ product_id, shareData }:any) => {
   const { asks, buys, spread } = OrderBookApi(product_id, shareData);
    return(
        <Card className="site-layout-background card-book-wrapper" bordered={false}>
        <p className='card-heading-color'>ORDER BOOK</p>
        <OBP type="ask" orders={asks} product_id={product_id} />
        <div className="OB__header">
          <div className="OB__header2">
            <div>Size</div>
            <div>Bid</div>
          </div>
        </div>
        <div className="OB__S">
          <div className="OB__SL">Spread</div>
          <div className="OB__SP">{spread}</div>
        </div>
        <OBP type="buy" orders={buys} product_id={product_id} /> 
        </Card>
    );

}
export default OrderBook;