import { useLocation } from "react-router-dom";
import { Product } from "../../models/products";
import { Grid, Avatar, Button, Card, Checkbox, CheckboxOptionType, Flex, Form, Input, InputNumber, Select, Statistic, Typography, Image, Row, Col, Space } from "antd";
import { SettingOutlined, EditOutlined, EllipsisOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useCart } from "../../contexts/CartContext";
import { OrderItemDto } from "../../models/orders";
const { useBreakpoint } = Grid;

import { isMobile, isTablet, isBrowser } from 'react-device-detect';
import { useState } from "react";
import { useNavigate } from "react-router-dom";




export default function ProductPreview()
{
    const navigate = useNavigate();
    const screens = useBreakpoint();
    const location = useLocation();
    const product = location.state as Product;
    const {cartCount,addOrderItem, updateCart, removeOrderItem, clearCart } = useCart(); // Initialize with the number of items in cart from local storage
    const [totalPrice,setTotalPrice] = useState(product.price);
    const [quantity, setQuantity] = useState(1)

     const addProductToCart = (product: Product) => {
             const orderItem: OrderItemDto = {
                productId: product.id,
                quantity: quantity, 
                product: product, 
                totalPrice: product.price*quantity,
             };
            addOrderItem(orderItem); 
    }

    const handleMinus = () => {
        setQuantity(quantity-1);
    }

    const handlePlus = () => {
        setQuantity(quantity+1);
    }

    const handleBrowserQuantityChange = (value: number) => {
        setQuantity(value);
    }

    const handleBuyNow = () => {
        const orderItem: OrderItemDto = {
            productId: product.id,
            quantity: quantity, 
            product: product, 
            totalPrice: product.price*quantity,
        };
        navigate("/checkoutsingleitem",{state : orderItem});
    }

    return (
            <Row
                justify='center'
            >
                {isMobile && 
                    (
                        <Col span={24}>
                            <Card
                                cover={
                                    <div
                                        style={{backgroundColor:"grey", justifyContent:'center', display:'flex'}}
                                    >

                                        <Image
                                        alt="example"
                                        src={product.imagePath}
                                        width="50%"
                                        style={{ height: 'auto', objectFit: 'contain' }}
                                        />

                                    </div>
                                    
                                }
                                actions={[
                                    <Button style={{fontSize:'25px'}} size="large" color="green" variant="solid" onClick={() => addProductToCart(product)} >Add to Cart</Button>,
                                    <Button style={{fontSize:'25px'}} size="large" type="primary" onClick={handleBuyNow}>Buy It Now</Button>,
                                ]}
                            >
                        
                                <Flex
                                    vertical
                                    gap={20}
                                    
                                >
                                    <div>
                                        <Card.Meta
                                        title={<Typography.Title level={1}>{product.name}</Typography.Title>}
                                        description={product.description}
                                        />
                                    </div>
                                    
                                
                                    <Flex vertical style={{ paddingBottom:'30px'}}>
                                        <Typography.Title level={5}>Extra</Typography.Title>
                                        <Flex
                                            vertical
                                        >
                                            <Checkbox 
                                                style={{ 
                                                    transform: 'scale(2)',
                                                    transformOrigin: 'top left',
                                                }}
                                            >Ballong</Checkbox>
                                        <br />
                                            <Checkbox 
                                                style={{ 
                                                    transform: 'scale(2)',
                                                    transformOrigin: 'top left',
                                                }}
                                            >Sticker</Checkbox>
                                        <br />
                                            <Checkbox
                                                style={{ 
                                                    transform: 'scale(2)',
                                                    transformOrigin: 'top left',
                                                }}
                                             >Photo</Checkbox>
                                        </Flex>
                                        
                                    </Flex>
                                    
                                    <div style={{paddingBottom:'30px'}}>
                                        <Typography.Title level={5}>Quantity</Typography.Title>
                                        <InputNumber 
                                            size="large"
                                            addonBefore={<MinusOutlined onClick={handleMinus}/>}
                                            addonAfter={<PlusOutlined onClick={handlePlus} />}
                                            style={{ 
                                                    // transform: 'scale(1)',
                                                    // transformOrigin: 'top left',
                                                }}
                                         min={1} 
                                         value={quantity}
                                         />
                                    </div>
                                    <div>
                                        <Statistic title="Total Cost" value={`${quantity*product.price} TZS`}/>
                                    </div>


                                </Flex>
                        
                            </Card>
                        </Col>
                    )
                }
                {isBrowser && 
                    (
                        <Col span={12}>
                            <Card
                        cover={
                            <div
                                style={{backgroundColor:"grey", justifyContent:'center', display:'flex'}}
                            >

                                <Image
                                alt="example"
                                src={product.imagePath}
                                width="50%"
                                style={{ height: 'auto', objectFit: 'contain' }}
                                />

                            </div>
                            
                        }
                        actions={[
                            <Button size='large' color="green" variant="solid" onClick={() => addProductToCart(product)} >Add to Cart</Button>,
                            <Button size="large" type="primary" onClick={handleBuyNow}>Buy It Now</Button>,
                        ]}
                    >
                        
                            <Flex
                                vertical
                                gap={5}
                                
                            >
                                <div>
                                    <Card.Meta
                                    title={product.name}
                                    description={product.description}
                                    />
                                </div>
                                
                            
                                <div>
                                    <Typography.Title level={5}>Extra</Typography.Title>
                                    <Checkbox  >Ballong</Checkbox>
                                    <br />
                                    <Checkbox >Sticker</Checkbox>
                                    <br />
                                    <Checkbox >Photo</Checkbox>
                                </div>
                                
                                <div>
                                    <Typography.Title level={5}>Quantity</Typography.Title>
                                    <InputNumber min={1} defaultValue={quantity} onChange={(e) => handleBrowserQuantityChange(e!=null?e:0)} />
                                </div>
                                <div>
                                    <Statistic title="Total Cost" value={quantity*product.price} />
                                </div>


                            </Flex>
                        
                            </Card>
                        </Col>
                    )
                }

                
            </Row>
            
        
    );
}