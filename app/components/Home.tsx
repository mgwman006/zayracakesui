import { Avatar, Badge, Breadcrumb, Button, Card, Col, Drawer, Flex, Image, InputNumber, Layout, List, Menu, Progress, Row, Statistic, theme } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import { LikeOutlined, MenuOutlined, MessageOutlined, ShoppingCartOutlined, StarOutlined } from '@ant-design/icons';
import { useCart } from '../contexts/CartContext';
import { OrderItemDto, Product } from '../models/products';
import Meta from 'antd/es/card/Meta';
import { n } from 'react-router/dist/development/lib-C1JSsICm.mjs';



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
  
const navigate = useNavigate();
const [visible, setVisible] = useState(false);
const screens = useBreakpoint();
const {cartCount, addOrderItem, updateCart, removeOrderItem, clearCart, getOrderItems} = useCart(); // Initialize with the number of items in cart from local storage
const [openCartDrawler, setOpenCartDrawler] = useState(false);
const [orderItems, setOderItems] = useState<OrderItemDto[]>([]); // Initialize with cart data from local storage

const showCartDrawer = () => {
    // If the cart drawer is already open, close it
    setOderItems(getOrderItems()); // Fetch the order items from local storage
    setOpenCartDrawler(true);
  };

  const onCloseCartDrawer = () => {
    setOpenCartDrawler(false);
  };


 

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
                        <Badge count={cartCount} showZero style={{ color: 'white' }} onClick={showCartDrawer} >
                          <ShoppingCartOutlined onClick={showCartDrawer} style={{ fontSize:25, color:'white'}} />
                        </Badge>
                        
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
       <Drawer
        size='large'
        placement="right"
        title="Shopping Cart"
        onClose={onCloseCartDrawer}
        open={openCartDrawler}
        footer={
              <Row>
                <Col span={6}>
                  <Statistic title="Total Items" value={cartCount} />
                </Col>
                <Col span={6}>
                  <Statistic title="Total Price (CNY)" value={orderItems.reduce((total, item) => total + item.totalPrice, 0)} precision={2} />
                </Col>

                <Col span={6} style={{ textAlign: 'center', marginTop: '16px' }}>
                  <Button 
                    type="primary" 
                    danger 
                    onClick={() => {
                      clearCart(); // Clear the cart in context
                      setOderItems([]); // Clear the order items state
                      onCloseCartDrawer(); // Close the drawer
                    }}
                  >
                    Clear Cart
                  </Button>
                </Col>

                <Col span={6} style={{ textAlign: 'center', marginTop: '16px' }}>
                  <Button 
                    type="primary" 
                    onClick={() => {
                      // Handle checkout logic here
                      // You can redirect to a checkout page or perform any other action
                      onCloseCartDrawer(); // Close the drawer after checkout
                      navigate('/checkout'); // Navigate to the checkout page
                    }}
                  >
                    Checkout
                  </Button>
                </Col>
              </Row>
              }
      >
        <List
          itemLayout="vertical"
          size="large"
          dataSource={orderItems}
          renderItem={(item, index) => (
            <List.Item
              key={item.productId}
              
              extra={
                <Image
                  width='200px'
                  height='200px'
                  style={{ objectFit: 'cover' }}
                  alt="logo"
                  src={item.product.imagePath ? item.product.imagePath : 'https://via.placeholder.com/150'}
                />
                
              }

            >
            <List.Item.Meta
              title={<a >{item.product.name}</a>}
            />
        <Row gutter={16}>
          <Col span={12}>
            <Meta
              description='Quantity'
            />
            <InputNumber
              min={1}
              max={500}
              defaultValue={item.quantity}
              onChange={(e) => {
                if (e !== null) {
                  const updatedOrderItems = [...orderItems];
                  updatedOrderItems[index].quantity = e;
                  updatedOrderItems[index].totalPrice = e * item.product.price;
                  setOderItems(updatedOrderItems);
                  updateCart(updatedOrderItems); // Update the cart in context
                }
              }}
            />
          </Col>
          <Col span={12}>
            <Statistic title="Account Balance (CNY)" value={item.totalPrice} precision={2} />
          </Col>
        </Row>
        
      </List.Item>
    )}
  />
      </Drawer>        
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
