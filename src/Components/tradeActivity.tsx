import * as React from 'react';
import { Card, Table } from 'antd';
const TradeActivity = () => {
    const dataSource = [
        {
          key: '1',
          asset: 'Apple INC.',
          side: 'Sell',
          status: 'Filled',
          time: '25/11/2019',
          qty: '100',
          price: '$17.45',
          total: '$1745',
        },
        {
            key: '2',
            asset: 'Microsoft Corp.',
            side: 'Buy',
            status: 'Pending',
            time: '25/11/2019',
            qty: '100',
            price: '$17.45',
            total: '$1745',
          },
          {
            key: '3',
            asset: 'Tesla Inc.',
            side: 'Sell',
            status: 'Filled',
            time: '25/11/2019',
            qty: '100',
            price: '$17.45',
            total: '$1745',
          },
          {
            key: '4',
            asset: 'Apple INC.',
            side: 'Sell',
            status: 'Filled',
            time: '25/11/2019',
            qty: '100',
            price: '$17.45',
            total: '$1745',
          },
          {
            key: '5',
            asset: 'Apple INC.',
            side: 'Sell',
            status: 'Filled',
            time: '25/11/2019',
            qty: '100',
            price: '$17.45',
            total: '$1745',
          },
          {
            key: '6',
            asset: 'Apple INC.',
            side: 'Sell',
            status: 'Filled',
            time: '25/11/2019',
            qty: '100',
            price: '$17.45',
            total: '$1745',
          },
          {
            key: '7',
            asset: 'Apple INC.',
            side: 'Sell',
            status: 'Filled',
            time: '25/11/2019',
            qty: '100',
            price: '$17.45',
            total: '$1745',
          },
      ];
    const columns = [
        {
          title: 'Asset',
          dataIndex: 'asset',
          key: 'asset',
        },
        {
          title: 'Side',
          dataIndex: 'side',
          key: 'side',
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
          },
          {
            title: 'Qty',
            dataIndex: 'qty',
            key: 'qty',
          },
          {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
          },
          {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
          },
      ];
    return(
        <Card className="site-layout-background card-book-wrapper" bordered={false}>
        <p className='card-heading-color'>TRENDING ACTIVITY</p>
        <div className='tableOverflowX'>
        <Table dataSource={dataSource} columns={columns} pagination={false} className="tradeActivityTable"/>
        </div>
        </Card>
    );

}
export default TradeActivity;