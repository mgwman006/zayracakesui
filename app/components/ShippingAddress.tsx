import { Col, Collapse, CollapseProps, Flex, Input, Row, Typography } from "antd";
import { ContactsFilled, ContactsOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'Contact Person',
    children: (
        <Flex vertical>
            <Row style={{ textAlign: 'left' }}>
                <Col span={12}>
                    <Typography.Title level={5}>Name</Typography.Title>
                    <Input
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
                        required
                        type="contact"
                        placeholder="Enter your phone number"
                        prefix={<PhoneOutlined />}
                        
                    />
                </Col>
            </Row>
        </Flex>
    ),
  },
  {
    key: '2',
    label: 'Address',
    children: (
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
    return <Collapse accordion  items={items} defaultActiveKey={['1']} />;
}