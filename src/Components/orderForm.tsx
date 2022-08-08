import * as React from 'react';
import { useEffect, useState } from "react";
import { Layout, Card, Button, Space, InputNumber, Row, Col, Tabs, Form, notification,Input } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification';
const { Content } = Layout;
const { TabPane } = Tabs;

const OrderForm = ({onHandleChange}:any) => {

    const [qty,setQty] = useState(100);
    const [price,setPrice] = useState(5000);
    const [totalPrice,setTotalPrice] = useState(qty*price);
    const [type, setType] = useState("buy");

    const qtyChange = (e:any) => {
        setQty(e.target.value);
        setTotalPrice(e.target.value*price);
    };

     
    const openNotification = (placement: NotificationPlacement, orderType:string) => {
        if(qty && totalPrice){
            onSentData();
            setTimeout(() => {
                notification.success({
                message: `Notification`,
                description: `${orderType} for Apple INC@${price} for ${qty} quantity is executed`,
                placement,
                className: 'notificationMsgContainer'
                });
            }, 3000);
        }
      };
   
    const onSentData = () => {
        const datass: any = { type: 'l2update', product_id: 'BTC-USD', changes:[type,totalPrice,qty] };
        onHandleChange(datass);
    }

    // const handleSubmit = () => {
    //     onSentData();
    // };
    const preventSymbol = (e:any) => {
        if (e.code === 'Minus' || e.code === "NumpadSubtract"  || e.code === "Equal" || e.code === "NumpadAdd") {
            e.preventDefault();
        }
    };

    const priceChange = (e:any) => {
        setPrice(e.target.value);
        setTotalPrice(qty*e.target.value);
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
                                        <Input size="large" type="number" min="0" style={{background: "rgb(43, 44, 59)"}} defaultValue={100} max={100000} name="buyQuantity" required id="buyQty" onChange={(e) => qtyChange(e)} onKeyPress={(e) => preventSymbol(e)}/>                    
                                    </Col>
                                    <Col sm={24} xs={24} md={12} lg={12}>
                                        <Row className='rowStyle'>Limit Price</Row>
                                        <Input size="large" type="number" style={{background: "rgb(43, 44, 59)"}} min={0} max={100000} name="limitPrice" defaultValue={5000} required id="buyPrice" onChange={(e) => priceChange(e)} onKeyPress={(e) => preventSymbol(e)}/>
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
                                    <Button size="large" onClick={() => openNotification('topRight','Order')}>Buy assets</Button>
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
                                    <Input size="large" type="number" min="0" style={{background: "rgb(43, 44, 59)"}} defaultValue={100} max={100000} name="sellQuantity" required id="sellQty" onChange={(e) => qtyChange(e)} onKeyPress={(e) => preventSymbol(e)}/>
                                    {/* <InputNumber size="large" step={0} min={0} max={100000} defaultValue={100} id="sellQty" required onChange={(e) => qtyChange(e)} onKeyPress={(e) => preventSymbol(e)} /> */}
                                    </Col>
                                    <Col sm={24} xs={24} md={12} lg={12}>
                                        <Row className='rowStyle'>Limit Price</Row>
                                        <Input size="large" type="number" style={{background: "rgb(43, 44, 59)"}} min={0} max={100000} name="limitPrice" defaultValue={5000} required id="sellPrice" onChange={(e) => priceChange(e)} onKeyPress={(e) => preventSymbol(e)}/>
                                        {/* <InputNumber size="large" step={0} min={0} max={100000} defaultValue={5000} id="sellPrice" required onChange={priceChange}/> */}
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
                                    <Button size="large" onClick={() => openNotification('topRight','Sold')}>Sell assets</Button>
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