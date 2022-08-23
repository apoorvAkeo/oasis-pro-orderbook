import * as React from 'react';
import { useState, useEffect } from 'react';
import { Layout, Card, Table, Row, Col } from 'antd';
import restActions from './actions/Rest';
const { Content } = Layout;

const PortFolio = ({shareData}:any) => {
  const [ balance, setTotalBalance ] = useState();
  const [ dSource, setDataSource ] = useState([]);
  var portfolioData:any = [];

  useEffect(() => {
    restActions
    .GET(`order/portfolio`)
    .then((res) => {
     setTotalBalance(res['available_funds'].toFixed(2));
     setDataSource(res['positions']);
    })
    .catch((err) => {
      console.log(err);
    })
  },[shareData]);

    dSource.map((item, key: number) => {
      let date = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(item['date']);
      portfolioData.push({ key: key, asset : item['asset']['name'], ticker: item['asset']['ticker'], qty: item['quantity'], price: item['cost_basis'], date: date})
    });
    const columns = [
        {
          title: 'Asset',
          dataIndex: 'asset',
          key: 'asset',
        },
        {
          title: 'Ticker',
          dataIndex: 'ticker',
          key: 'ticker',
        },
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
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
        }
      ];
    return(
        <Card className="site-layout-background card-book-wrapper" bordered={false}>
        <Row className='card-heading-color'>PORTFOLIO</Row>
        <Row className='portfolioMargin'>
            <p>${balance}</p>
            <p>Total Balance</p>
        </Row>
        <Col>
        <div className='tableOverflowX'>
        <Table dataSource={portfolioData} columns={columns} pagination={false} className="tdCellBorder" />
        </div>
        </Col>
        </Card>
    );

}
export default PortFolio;