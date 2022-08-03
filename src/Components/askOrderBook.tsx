import * as React from 'react';
import { Card, Table } from 'antd';
const { Meta } = Card;
const AskOrderBook = () => {
    const dataSource = [
        {
          key: '1',
          total: '2232',
          size: 40,
          ask: '$5.80',
        },
        {
            key: '2',
            total: '2232',
            size: 40,
            ask: '$5.80',
        },
        {
            key: '3',
            total: '2232',
            size: 40,
            ask: '$5.80',
        },
        {
            key: '4',
            total: '2232',
            size: 40,
            ask: '$5.80',
        },
        {
            key: '5',
            total: '2232',
            size: 40,
            ask: '$5.80',
        },
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
          title: 'Ask',
          dataIndex: 'ask',
          key: 'ask',
        },
      ];
    return(
        <Card className="site-layout-background askTableCss" style={{ width: '100%',borderColor: '#2b2c3b',color:'white'}}>
        <Table dataSource={dataSource} columns={columns}  pagination={false}/>
        </Card>
    );

}
export default AskOrderBook;