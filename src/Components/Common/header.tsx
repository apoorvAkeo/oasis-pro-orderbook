import { DownOutlined } from '@ant-design/icons';
import * as React from 'react';
import { Row, Col, Dropdown, Menu, Space, Typography, Select } from "antd";


const SiteHeader = ({onAssetChange}:any) => {
    const { Option } = Select;

    const changeAssetValue = (e:any) => {
        onAssetChange(e);
    }    

        return(
            <Row className="selectDropDownLabel">
                    <div className="select-wrap">
                        <Select defaultValue="RCN" className='ChangeDropDownColor' bordered={false} onChange={(e) => changeAssetValue(e)}>
                            <Option value="RCN">RCN</Option>
                            {/* <Option value="EGX">EGX</Option>
                            <Option value="IXC">IXC</Option> */}
                            {/* <Option value="Tesla">Tesla</Option> */}
                        </Select>
                        <label>Select asset</label>
                    </div>
                    {/* <Row>
                        <Col>
                            <span>$93.00</span>
                            <span>Last trade price</span>
                        </Col>
                        <Col>
                            <span><a>2093090</a></span>
                            <span>Shares</span>
                        </Col>
                    </Row> */}
            </Row>
        );

}
export default SiteHeader;