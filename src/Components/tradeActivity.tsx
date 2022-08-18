// import * as React from 'react';
import React, { useState, useEffect } from 'react';
import restActions from './actions/Rest';
import { Card, Table } from 'antd';

const TradeActivity = ({shareData}:any) => {
  const [dSource, setDataSource] = useState([]);
  var trendingDAta:any = [];
  useEffect(() => {
    restActions
    .GET(`trade/recent-trades`)
    .then((res:any) => {
     setDataSource(res);
    })
    .catch((err) => {
      console.log(err);
    })
  },[shareData]);
  dSource.map((item) => {
    let side = (item['side'] === 1 ? 'Buy' : 'Sell');
    trendingDAta.push({ ticker : item['ticker'], name: item['name'], quantity: item['quantity'], price: item['price'], side: side})
  });
    const columns = [
        {
          title: 'Ticker',
          dataIndex: 'ticker',
          key: 'ticker',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
          },
          {
            title: 'Qty',
            dataIndex: 'quantity',
            key: 'quantity',
          },
        {
          title: 'Side',
          dataIndex: 'side',
          key: 'side',
        }
      ];
    return(
        <Card className="site-layout-background card-book-wrapper" bordered={false}>
        <p className='card-heading-color'>TRENDING ACTIVITY</p>
        <div className='tableOverflowX'>
        <Table dataSource={trendingDAta} columns={columns} pagination={false} className="tradeActivityTable"/>
        </div>
        </Card>
    );

}
export default TradeActivity;