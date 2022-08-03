import * as React from 'react';
import { useEffect } from 'react';
import restActions from './actions/Rest';
import { Card, Table } from 'antd';
import OrderBookApi from './hooks/OrderBookApi';
import OBP from './hooks/OBP';
import '../../src/App.css';
const { Meta } = Card;
const OrderBook = ({ product_id, shareData }:any) => {
   const { asks, buys } = OrderBookApi(product_id, shareData);

   //api calling setup
   useEffect(()=>{
    restActions
    .GET(`/hacktivist123/repos`,'')
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error.toJSON()) 
    });
   },[]);

    const dataSource = [
        {
          key: '1',
          total: '2232',
          size: 40,
          bid: '$5.80',
        },
        {
            key: '2',
            total: '2232',
            size: 40,
            bid: '$5.80',
        },
        {
            key: '3',
            total: '2232',
            size: 40,
            bid: '$5.80',
        },
        {
            key: '4',
            total: '2232',
            size: 40,
            bid: '$5.80',
        },
        {
            key: '5',
            total: '2232',
            size: 40,
            bid: '$5.80',
        },
        {
          key: '6',
          total: '2232',
          size: 40,
          bid: '$5.80',
        },
        {
          key: '7',
          total: '2232',
          size: 40,
          bid: '$5.80',
        },
        {
          key: '8',
          total: '2232',
          size: 40,
          bid: '$5.80',
        },
        {
          key: '9',
          total: '2232',
          size: 40,
          bid: '$5.80',
        },
        {
          key: '10',
          total: '2232',
          size: 40,
          bid: '$5.80',
        },
        {
          key: '11',
          total: '2232',
          size: 40,
          bid: '$5.80',
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
        },
      ];
    
      let spread = "...";
      if (asks[0] && buys[0]) {
        spread = (Number(asks[0][0]) - Number(buys[0][0])).toFixed(2);
      }
    return(
        <Card className="site-layout-background card-book-wrapper" bordered={false}>
        <p className='card-heading-color'>ORDER BOOK</p>
        <OBP type="buy" orders={buys} product_id={product_id} />
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
        <OBP type="ask" orders={asks} product_id={product_id} />
        </Card>
    );

}
export default OrderBook;