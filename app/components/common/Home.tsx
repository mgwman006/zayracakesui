import { Avatar, Badge, Breadcrumb, Button, Card, Col, Drawer, Flex, Image, InputNumber, Layout, List, Menu, Progress, Row, Statistic, theme, Typography } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import { LikeOutlined, MenuOutlined, MessageOutlined, ShoppingCartOutlined, StarOutlined } from '@ant-design/icons';
import { useCart } from '../../contexts/CartContext';
import { OrderItemDto} from '../../models/orders';
import Meta from 'antd/es/card/Meta';
import { useUserContext } from "../../contexts/UserContext";
import { UserStatus } from '../../models/user';
import { isMobile, isTablet, isBrowser } from 'react-device-detect';




const items = [
  {
    key: '1',
    label: <Link to="" ><b>Home</b></Link>,
  },
  {
    key: '2',
    label: <Link to="/" color='white'><b>Product List</b></Link>,
  },
  {
    key: '3',
    label: <Link to="" color='white'><b>Find A Store</b></Link>,
  }
];



 
export default function Home() {

const { userStatus} = useUserContext(); // Get user status and login state from context
  
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


 

  const handleNavigateToCheckOutPage = () => {
    // check if user is logged in, if not redirect to login page
    if (userStatus === UserStatus.LoggedIn) {
      navigate('/checkout');

    } else {
      navigate('/login'); 
    }
  }

 return (
      <Layout>
      {isMobile ? 
        (
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

              <div style={{ }}>
                    <MenuOutlined  onClick={() => setVisible(true)} style={{ fontSize:'25px', color:'white'}}/>
                    <Drawer
                    title="Menu"
                    placement="left"
                    onClose={() => setVisible(false)}
                    open={visible}
                    size='large'
                    >
                      <Menu defaultSelectedKeys={['2']}  theme="dark" mode="vertical" items={items} onClick={() => setVisible(false)} />
                    </Drawer>
              </div>
                  
              
                

                <div style={{ fontSize:'25PX', width:'100%',textAlign:'center', color:'white'}}>
                  ZayraCakes
                </div>
                <div style={{ }}>
                    <Badge count={cartCount} showZero style={{ color: 'white'}} onClick={showCartDrawer} >
                      <ShoppingCartOutlined onClick={showCartDrawer} style={{fontSize:25, color:'white'}} />
                    </Badge>
                          
                  
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
                                    handleNavigateToCheckOutPage(); // Navigate to the checkout page
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
                </div>
              
                    
          </Header>
        ):

        (
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
                    <div className="demo-logo" style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', marginRight: '16px' }}>
                      ZayraCakes
                    </div>
                      <Menu
                      theme="dark"
                      mode="horizontal"
                      defaultSelectedKeys={['2']}
                      items={items}
                      style={{ flex: 1, minWidth: 0, justifyContent:'center' }}
                    />


                    <Badge count={cartCount} showZero style={{ color: 'white' }} onClick={showCartDrawer} >
                      <ShoppingCartOutlined onClick={showCartDrawer} style={{ fontSize:25, color:'white'}} />
                    </Badge>
                 
              
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
                                    handleNavigateToCheckOutPage(); // Navigate to the checkout page
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
        )
      }
      



      <Content>
        <div>
          <Outlet />
        </div>
      </Content>



      <Footer style={{ textAlign: 'center' }}>
        ©{new Date().getFullYear()} Created by <a href='https://www.tante.tz' target="_blank">tante.tz</a>
      </Footer>
    </Layout>
 );
}
