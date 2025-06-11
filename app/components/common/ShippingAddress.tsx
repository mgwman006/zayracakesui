import { Col, Collapse, CollapseProps, Flex, Input, Row, Typography } from "antd";
import { ContactsFilled, ContactsOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { isMobile, isTablet, isBrowser } from 'react-device-detect';


const items: CollapseProps['items'] = [
  {
    key: '1',
    label: isMobile ? (<Typography.Title level={1}>Contact Person</Typography.Title>) : (<Typography.Title level={5}>Contact Person</Typography.Title>),
    children: isMobile ? (
        <Flex vertical>
            <Row style={{ textAlign: 'left' }}>
                <Col span={12}>
                    <Typography.Title level={3}>Name</Typography.Title>
                    <Input
                        size="large"
                        width='100%'
                        type="text"
                        placeholder="Enter your name"
                        prefix = {<UserOutlined />}
                        required
                    />
                </Col>
            </Row>
            <Row style={{ textAlign: 'left' }}>
                <Col span={12}>
                    <Typography.Title level={3}>Phone Number</Typography.Title>
                    <Input
                        size="large"
                        required
                        type="contact"
                        placeholder="Enter your phone number"
                        prefix={<PhoneOutlined />}
                        
                    />
                </Col>
            </Row>
        </Flex>
    ) :
    (
        <Flex vertical>
            <Row style={{ textAlign: 'left' }}>
                <Col span={12}>
                    <Typography.Title level={5}>Name</Typography.Title>
                    <Input
                        size="large"
                        width='100%'
                        type="text"
                        placeholder="Enter your name"
                        prefix = {<UserOutlined />}
                        required
                    />
                </Col>
            </Row>
            <Row style={{ textAlign: 'left' }}>
                <Col span={12}>
                    <Typography.Title level={5}>Phone Number</Typography.Title>
                    <Input
                        size="large"
                        required
                        type="contact"
                        placeholder="Enter your phone number"
                        prefix={<PhoneOutlined />}
                        
                    />
                </Col>
            </Row>
        </Flex>
    ) 
    
  },
  {
    key: '2',
    label: isMobile ? (<Typography.Title level={1}>Address</Typography.Title>) : (<Typography.Title level={5}>Address</Typography.Title>) ,
    children: isMobile ? (
        <Flex vertical>
            <Row style={{ textAlign: 'left' }}>
                <Col span={12}>
                    <Typography.Title level={3}>Address Line / Street / Mtaa</Typography.Title>
                    <Input
                        size="large"
                        required
                        type="text"
                        placeholder="Enter address line 1"
                    />
                </Col>
            </Row>
            
            <Row style={{ textAlign: 'left' }}>
                <Col span={12}>
                    <Typography.Title level={3}>City / Wilaya</Typography.Title>
                    <Input
                        size="large"
                        required
                        type="text"
                        placeholder="Enter your city"
                        
                    />
                </Col>
            </Row>
            <Row style={{ textAlign: 'left' }}>
                <Col span={12}>
                    <Typography.Title level={3}>State/Mkoa</Typography.Title>
                    <Input
                        size="large"
                        required
                        type="text"
                        placeholder="Enter your state"
                        
                    />
                </Col>
            </Row>
            <Row style={{ textAlign: 'left' }}>
                <Col span={12}>
                    <Typography.Title level={3}>Zip Code</Typography.Title>
                    <Input
                        size="large"
                        type="text"
                        placeholder="Enter your zip code"
                    />
                </Col>
            </Row>
            <Row style={{ textAlign: 'left' }}>
                <Col span={12}>
                    <Typography.Title level={3}>Country / Nchi</Typography.Title>
                    <Input
                        size="large"
                        required
                        type="text"
                        placeholder="Enter your country"
                        
                    />
                </Col>
            </Row>
        </Flex>
        ) :
        (
        <Flex vertical>
            <Row style={{ textAlign: 'left' }}>
                <Col span={12}>
                    <Typography.Title level={5}>Address Line / Street / Mtaa</Typography.Title>
                    <Input
                        required
                        type="text"
                        placeholder="Enter address line 1"
                    />
                </Col>
            </Row>
            
            <Row style={{ textAlign: 'left' }}>
                <Col span={12}>
                    <Typography.Title level={5}>City / Wilaya</Typography.Title>
                    <Input
                        required
                        type="text"
                        placeholder="Enter your city"
                        
                    />
                </Col>
            </Row>
            <Row style={{ textAlign: 'left' }}>
                <Col span={12}>
                    <Typography.Title level={5}>State/Mkoa</Typography.Title>
                    <Input
                        required
                        type="text"
                        placeholder="Enter your state"
                        
                    />
                </Col>
            </Row>
            <Row style={{ textAlign: 'left' }}>
                <Col span={12}>
                    <Typography.Title level={5}>Zip Code</Typography.Title>
                    <Input
                        type="text"
                        placeholder="Enter your zip code"
                        
                        
                    />
                </Col>
            </Row>
            <Row style={{ textAlign: 'left' }}>
                <Col span={12}>
                    <Typography.Title level={5}>Country / Nchi</Typography.Title>
                    <Input
                        required
                        type="text"
                        placeholder="Enter your country"
                        
                    />
                </Col>
            </Row>
        </Flex>
        ),
  },
  
];

export default function ShippingAddress() {
    return <Collapse size="large" accordion  items={items} defaultActiveKey={['1']} />;
}