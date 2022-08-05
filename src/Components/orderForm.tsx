import * as React from 'react';
import { useEffect, useState } from "react";
import { Layout, Card, Button, Space, InputNumber, Row, Col, Tabs, Form, notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification';
const { Content } = Layout;
const { TabPane } = Tabs;

const OrderForm = ({onHandleChange}:any) => {

    const openNotification = (placement: NotificationPlacement, orderType:string) => {
        onSentData();
        setTimeout(() => {
            notification.success({
            message: `Notification`,
            description: `order for Apple INC@price for ${qty} quantity is executed`,
            placement,
            className: 'notificationMsgContainer'
            });
        }, 3000);
      };

    const [qty,setQty] = useState(100);
    const [price,setPrice] = useState(5000);
    const [totalPrice,setTotalPrice] = useState(qty*price);
    const [type, setType] = useState("buy");

    const qtyChange = (e:number) => {
        setQty(e);
        setTotalPrice(e*price);
    };

    const onSentData = () => {
        const datass: any = { type: 'l2update', product_id: 'BTC-USD', changes:[type,totalPrice,qty] };
        if(qty && totalPrice)
        onHandleChange(datass);
    }

    // const handleSubmit = () => {
    //     onSentData();
    // };

    const priceChange = (e:number) => {
        setPrice(e);
        setTotalPrice(qty*e);
    }

    const setTabChange = (activeKey:any) => {
        if(activeKey==2){
            setType("sell");
        }
        setQty(100);
        setPrice(5000);
        setTotalPrice(qty*price);
    }

    return(
        <Card className="site-layout-background card-book-wrapper" bordered={false}>
            <Row className='card-heading-color'>ORDER FORM</Row>
                <Row className='orderFormButtonSection' >
                    <Tabs defaultActiveKey="1" type="card" size={'small'} onChange={setTabChange}>
                        <TabPane tab="Buy" key="1" className='buyButton'>
                                <Row className='row-top-margin'>
                                    <Col sm={12} xs={12} md={12} lg={12}>
                                    <div>Apple Computers Inc.</div>
                                    <div>Selected asset</div>
                                    </Col>
                                    <Col sm={12} xs={12} md={12} lg={12} className='textAlignRight'>
                                    <div>$93.00</div>
                                    <div>Price share</div>
                                    </Col>
                                </Row>
                                <form>
                                <Row className='changeNumberInputColor second-row-top-margin' gutter={8}>
                                    <Col sm={24} xs={24} md={12} lg={12}>
                                        <Row className='rowStyle'>Select quantity</Row>
                                        <InputNumber size="large" min={0} max={100000} name="buyQuantity" defaultValue={100} required id="buyQty" onChange={qtyChange} />
                                    </Col>
                                    <Col sm={24} xs={24} md={12} lg={12}>
                                        <Row className='rowStyle'>Limit Price</Row>
                                        <InputNumber size="large" min={0} max={100000} name="limitPrice" defaultValue={5000} required id="buyPrice" onChange={priceChange}/>
                                    </Col>
                                </Row>
                                <Row className="parentTotalPrice">
                                    <Col span={24}>
                                        <div className='totalPriceDiv'>
                                            <Row>  
                                                <Col span={12} >
                                                    Total price
                                                </Col>
                                                <Col span={12} className="totalPriceValue">
                                                    ${totalPrice}
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className='thirdRowOrderForm'>
                                    <Col span={24} >
                                    <Button size="large" onClick={() => openNotification('topRight','buy')}>Buy assets</Button>
                                    </Col>
                                </Row>
                                </form>
                        </TabPane>
                        <TabPane tab="Sell" key="2" className='sellButton'>
                                <Row className='row-top-margin'>
                                    <Col  sm={12} xs={12} md={12} lg={12}>
                                    <div>Apple Computers Inc.</div>
                                    <div>Selected asset</div>
                                    </Col>
                                    <Col sm={12} xs={12} md={12} lg={12} className='textAlignRight'>
                                    <div>$93.00</div>
                                    <div>Price share</div>
                                    </Col>
                                </Row>
                                <form>
                                <Row className='changeNumberInputColor second-row-top-margin' gutter={8}>
                                    <Col sm={24} xs={24} md={12} lg={12}>
                                    <Row className='rowStyle'>Select quantity</Row>
                                    <InputNumber size="large" min={0} max={100000} defaultValue={100} id="sellQty" required onChange={qtyChange}/>
                                    </Col>
                                    <Col sm={24} xs={24} md={12} lg={12}>
                                        <Row className='rowStyle'>Limit Price</Row>
                                        <InputNumber size="large" min={0} max={100000} defaultValue={5000} id="sellPrice" required onChange={priceChange}/>
                                    </Col>
                                </Row>
                                <Row className="parentTotalPrice">
                                    <Col span={24}>
                                        <div className='totalPriceDiv'>
                                            <Row>  
                                                <Col span={12}>
                                                    Total price
                                                </Col>
                                                <Col span={12}>
                                                  ${totalPrice}
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className='thirdRowOrderForm'>
                                    <Col span={24}>
                                    <Button size="large" onClick={() => openNotification('topRight','sell')}>Sell assets</Button>
                                    </Col>
                                </Row>
                                </form>
                        </TabPane>
                    </Tabs>
                </Row>
               
                
            
             
        </Card>
    );

}
export default OrderForm;