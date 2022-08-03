import * as React from 'react';
import { Layout, Card, Table, Row, Col } from 'antd';
const { Content } = Layout;
const PortFolio = () => {
    const dataSource = [
        {
          key: '1',
          asset: 'Apple Inc',
          qty: 220,
          price: '100.32',
          total: '22070.40',
        },
        {
            key: '2',
            asset: 'Apple Inc',
            qty: 220,
            price: '100.32',
            total: '22070.40',
          },
          {
            key: '3',
            asset: 'Apple Inc',
            qty: 220,
            price: '100.32',
            total: '22070.40',
          },
          {
            key: '4',
            asset: 'Apple Inc',
            qty: 220,
            price: '100.32',
            total: '22070.40',
          },
          {
            key: '5',
            asset: 'Apple Inc',
            qty: 220,
            price: '100.32',
            total: '22070.40',
          },
          {
            key: '6',
            asset: 'Apple Inc',
            qty: 220,
            price: '100.32',
            total: '22070.40',
          },
          {
            key: '7',
            asset: 'Apple Inc',
            qty: 220,
            price: '100.32',
            total: '22070.40',
          }
      ];
    const columns = [
        {
          title: 'Asset',
          dataIndex: 'asset',
          key: 'asset',
        },
        {
          title: 'Qty.',
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
        <Row className='card-heading-color'>PORTFOLIO</Row>
        <Row className='portfolioMargin'>
            <p>$17'300.24</p>
            <p>Total Balance</p>
        </Row>
        <Col>
        <div className='tableOverflowX'>
        <Table dataSource={dataSource} columns={columns} pagination={false} className="tdCellBorder" />
        </div>
        </Col>
        </Card>
    );

}
export default PortFolio;