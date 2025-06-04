import { Breadcrumb, Button, Col, Drawer, Flex, Layout, Menu, Progress, Row, theme } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { useState } from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';

import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import { MenuOutlined } from '@ant-design/icons';



const items = [
  {
    key: '1',
    label: <Link to="homepage">Home</Link>,
  },
  {
    key: '2',
    label: <Link to="/">Product List</Link>,
  }
];
export default function Home() {
  
const [visible, setVisible] = useState(false);
const screens = useBreakpoint()

 
 return (
      <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        
        {screens.xs || screens.sm ? (
          
              <Row  style={{ width: '100%' }}>
                  <Col span={8} style={{ textAlign: 'left', color: 'white', display: 'flex', alignItems: 'center', 
                   }}>
                    <MenuOutlined  onClick={() => setVisible(true)} style={{width:'100%', fontSize:25}}/>
                     
                  
                    <Drawer
                    title="Menu"
                    placement="left"
                    onClose={() => setVisible(false)}
                    open={visible}
                    >
                      <Menu mode="vertical" items={items} onClick={() => setVisible(false)} />
                    </Drawer>
                  </Col>

                  <Col span={8} style={{ textAlign: 'center', color: 'white', fontSize: '25px', fontWeight: 'bold' }}>
                    <div>
                      ZayraCakes
                    </div>
                  </Col>
                  <Col span={8} style={{ textAlign: 'right', color: 'white' }}>
                  </Col>
              </Row>
            
            

        ):
          (
            <>
            <div className="demo-logo" style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', marginRight: '16px' }}>
          {/* <img src="/logo.png" alt="Logo" style={{ height: '32px', marginRight: '16px' }} /> */}
          Zayra Cakes
        </div>
             <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
            </>
       
          )
      }
        
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <div>
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        ©{new Date().getFullYear()} Created by Tante
      </Footer>
    </Layout>
 );
}
