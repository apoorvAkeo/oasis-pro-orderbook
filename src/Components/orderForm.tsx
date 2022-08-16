import * as React from 'react';
import { useState } from "react";
import restActions from './actions/Rest';
import { Card, Button, Row, Col, Tabs, notification,Input } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification';

const { TabPane } = Tabs;

const OrderForm = ({onHandleChange}:any) => {

    const [qty,setQty] = useState(0);
    const [price,setPrice] = useState(0);
    const [totalPrice,setTotalPrice] = useState(qty*price);
    const [type, setType] = useState("sell");

    const qtyChange = (e:any) => {
        setQty(e.target.value);
        setTotalPrice(e.target.value*price);
    };

     
    const postOrderBookData = (placement: NotificationPlacement, orderType:string) => {
        if(qty && totalPrice){
                let data:any = {
                    price: price,
                    quantity: qty
                };
                var url =  `order/post-ask`;
                if(orderType=="Order"){
                url =  `order/post-bid`;
                }
                const params = new URLSearchParams(data);
                restActions
                .POST(url,data)
                .then((res) => {
                    onSentData();
                    setQty(0);
                    setPrice(0);
                    setTimeout(() => {
                        notification.success({
                        message: `Notification`,
                        description: `${orderType} for Apple INC@${price} for ${qty} quantity is executed`,
                        placement,
                        className: 'notificationMsgContainer'
                        });
                    }, 3000);
                })
                .catch((error) => {
                  console.log(error.toJSON()) 
                })      
        }else{
            notification.error({
                message: `Error`,
                description: `Select quantity and limit price is mandatory`,
                placement,
              //  duration: 100000,
                className: 'errorMsgContainer'
                });
        }
      };
   
    const onSentData = () => {
       onHandleChange({});
    }

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
            setType("buy");
        }
        setQty(0);
        setPrice(0);
        setTotalPrice(qty*price);
    }

    return(
        <Card className="site-layout-background card-book-wrapper" bordered={false}>
            <Row className='card-heading-color'>ORDER FORM</Row>
                <Row className='orderFormButtonSection' >
                    <Tabs defaultActiveKey="1" type="card" size={'small'} onChange={setTabChange}>
                        <TabPane tab="Sell" key="1" className='sellButton'>
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
                                    <Input size="large" type="number" min="1" style={{background: "rgb(43, 44, 59)"}}  max={100000} name="sellQuantity" required id="sellQty" onChange={(e) => qtyChange(e)} onKeyPress={(e) => preventSymbol(e)}/>
                                    {/* <InputNumber size="large" step={0} min={0} max={100000} defaultValue={100} id="sellQty" required onChange={(e) => qtyChange(e)} onKeyPress={(e) => preventSymbol(e)} /> */}
                                    </Col>
                                    <Col sm={24} xs={24} md={12} lg={12}>
                                        <Row className='rowStyle'>Limit Price</Row>
                                        <Input size="large" type="number" style={{background: "rgb(43, 44, 59)"}} min={1} max={100000} name="limitPrice" required id="sellPrice" onChange={(e) => priceChange(e)} onKeyPress={(e) => preventSymbol(e)}/>
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
                                                  ${totalPrice.toFixed(2)}
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className='thirdRowOrderForm'>
                                    <Col span={24}>
                                    <Button size="large" onClick={() => postOrderBookData('topRight','Sold')}>Sell assets</Button>
                                    </Col>
                                </Row>
                                </form>
                        </TabPane>
                        <TabPane tab="Buy" key="2" className='buyButton'>
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
                                        <Input size="large" type="number" min="1" style={{background: "rgb(43, 44, 59)"}} max={100000} name="buyQuantity" required id="buyQty" onChange={(e) => qtyChange(e)} onKeyPress={(e) => preventSymbol(e)}/>                    
                                    </Col>
                                    <Col sm={24} xs={24} md={12} lg={12}>
                                        <Row className='rowStyle'>Limit Price</Row>
                                        <Input size="large" type="number" style={{background: "rgb(43, 44, 59)"}} min={1} max={100000} name="limitPrice" required id="buyPrice" onChange={(e) => priceChange(e)} onKeyPress={(e) => preventSymbol(e)}/>
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
                                                    ${totalPrice.toFixed(2)}
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className='thirdRowOrderForm'>
                                    <Col span={24} >
                                    <Button size="large" onClick={() => postOrderBookData('topRight','Order')}>Buy assets</Button>
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