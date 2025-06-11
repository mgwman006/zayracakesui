import { Button, Col, Result, Row, Tabs, TabsProps } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import ShippingAddress from "./ShippingAddress";
import { isMobile, isTablet, isBrowser } from 'react-device-detect';


const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Delivery',
    children: <ShippingAddress />,
  },
  {
    key: '2',
    label: 'Collection',
    children: (
        <Result
            icon={<SmileOutlined />}
            title="Great, We will be waiting for you!"
            extra={<Button type="text">Click Next, See you then</Button>}
        />
    ),
  }
];

export default function ShippingMethods() {
        return (
          <>
            {isMobile && (
              <Row justify='center' style={{ alignContent:'center', textAlign: 'center', backgroundColor: 'white', padding: '20px', borderRadius: '8px', margin: '20px 20px' }}>
                  <Col span={24}>
                      <Tabs size="large" defaultActiveKey="1" items={items}  />
                  </Col>
              </Row>
            )}
            {isBrowser && (
              <Row style={{ textAlign: 'center', backgroundColor: 'white', padding: '20px', borderRadius: '8px', margin: '20px 20px' }}>
                  <Col span={24}>
                      <Tabs defaultActiveKey="1" items={items}  />
                  </Col>
              </Row>
            )}
          </>
        );
    }