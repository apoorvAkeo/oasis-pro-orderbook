// import * as React from 'react';
import React, { useState, useEffect } from 'react';
import restActions from './actions/Rest';
import { Card, Table } from 'antd';

const TradeActivity = ({shareData}:any) => {
  const [dSource, setDataSource] = useState([]);
  useEffect(() => {
    restActions
    .GET(`trade/recent-trades`)
    .then((res:any) => {
   //  console.log("treding Activity",res);
     setDataSource(res);
   //  console.log(dSource);
    })
    .catch((err) => {
      console.log(err);
    })
  },[shareData]);

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
        <Table dataSource={dSource} columns={columns} pagination={false} className="tradeActivityTable"/>
        </div>
        </Card>
    );

}
export default TradeActivity;