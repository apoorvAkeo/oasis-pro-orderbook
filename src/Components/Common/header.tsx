import { DownOutlined } from '@ant-design/icons';
import * as React from 'react';
import { Row, Col, Dropdown, Menu, Space, Typography, Select } from "antd";

const SiteHeader = () => {
    const { Option } = Select;
        return(
            <Row className="selectDropDownLabel">
                    <div className="select-wrap">
                        <Select defaultValue="Apple INC" className='ChangeDropDownColor' bordered={false}>
                            <Option value="Apple INC">Apple INC</Option>
                            <Option value="Microsoft">Microsoft</Option>
                            <Option value="Tesla">Tesla</Option>
                        </Select>
                        <label>Select asset</label>
                    </div>
                    <Row>
                        <Col>
                            <span>$93.00</span>
                            <span>Last trade price</span>
                        </Col>
                        <Col>
                            <span><a>2093090</a></span>
                            <span>Shares</span>
                        </Col>
                    </Row>
            </Row>
        );

}
export default SiteHeader;