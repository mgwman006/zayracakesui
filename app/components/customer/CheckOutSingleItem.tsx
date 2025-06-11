import { useLocation } from "react-router-dom";
import { OrderItemDto } from "../../models/orders";
import { Button, Card, Col, Flex, Form, Input, message, Radio, Result, Row, Steps, theme, Typography, Image, Statistic, InputNumber, Space } from "antd";
import { useState } from "react";
import { ArrowUpOutlined, EditOutlined, EllipsisOutlined, SettingOutlined, SmileOutlined } from '@ant-design/icons';
import { CheckboxGroupProps } from "antd/es/checkbox";
import { useForm } from "antd/es/form/Form";
import Meta from "antd/es/card/Meta";
import { isMobile, isTablet, isBrowser } from 'react-device-detect';

const options: CheckboxGroupProps<string>['options'] = [
  { label: 'Delivery', value: 'delivery' },
  { label: 'Pickup', value: 'pickup' },
];
type AddressFormType = {
    name:String;
    phoneNumber:String;
    street:String;
    city:String;
    state:String;
    zipCode:String;
    country:String;
}
export default function CheckOutSingleItem()
{
    const [currentValue, setCurrentValue] = useState(0);
    const [hideForm, setHideForm] = useState(false);
    const location = useLocation();
    const orderItem = location.state as OrderItemDto;
    const [addressForm] = Form.useForm<AddressFormType>();
    const [shippingMode, setShippingMode] = useState<String>("delivery");


    


    const handleShippingMode  = (value:String) => {
        setShippingMode(value);
        if(value==='pickup')
            setHideForm(true);
        else
            setHideForm(false);
    }

    const onStepChange = (step: number) => {
        if(step<currentValue)
            setCurrentValue(step);
    };

    const handleSubmitAddress = () => {
        setCurrentValue(1);
    }

    return (
        <Row justify={"center"}>
            {isMobile ?
                (
                    <Col span={24}>
                        <Flex vertical gap={20} style={{marginTop:"50px"}}>
                            <Steps
                                onChange={(e) => onStepChange(e)}
                                current={currentValue}
                                items={[
                                {
                                    title: 'Shiping',
                                },
                                {
                                    title: 'Summary',
                                },
                                {
                                    title: 'Payment',
                                },
                                ]}
                            />

                            {currentValue==0 && (
                                <Flex vertical>
                                    
                                    <Radio.Group
                                        onChange={(e) => handleShippingMode(e.target.value)}
                                        options={options}
                                        value={shippingMode}
                                        optionType="button"
                                        buttonStyle="solid"
                                    />

                                    <Form<AddressFormType>
                                        hidden={hideForm}
                                        form={addressForm}
                                        layout="vertical"
                                        onFinish={handleSubmitAddress}
                                    >
                                        <Form.Item 
                                            label='Name of Contact Person'
                                            name="name"
                                            rules={[{ required: true }]}
                                        >
                                            <Input size="large" type="text"></Input>
                                        </Form.Item>
                                        <Form.Item 
                                            label='Phone Number'
                                            name="phoneNumber"
                                            rules={[{ required: true }]}
                                        >
                                            <Input size="large" type="text"></Input>
                                        </Form.Item>
                                        <Form.Item 
                                            label='Street/Mtaa'
                                            name="street"
                                            rules={[{ required: true }]}
                                        >
                                            <Input size="large" type="text"></Input>
                                        </Form.Item>
                                        <Form.Item 
                                            label='City/Wilaya'
                                            name="city"
                                            rules={[{ required: true }]}
                                        >
                                            <Input size="large" type="text"></Input>
                                        </Form.Item>
                                        <Form.Item 
                                            label='State/Mkoa'
                                            name="state"
                                            rules={[{ required: true }]}
                                        >
                                            <Input size="large" type="text"></Input>
                                        </Form.Item>
                                        <Form.Item 
                                            label='Country/Nchi'
                                            name="country"
                                            initialValue={"Tanzania"}
                                            rules={[{ required: true }]}
                                        >
                                            <Input size="large" type="text" value="Tanzania" disabled></Input>
                                        </Form.Item>
                                        <Form.Item >
                                            <Button size="large" variant="solid" color="green" htmlType="submit">Submit</Button>
                                        </Form.Item>
                                    </Form>
                                    {hideForm && (
                                        <Result
                                        icon={<SmileOutlined />}
                                        title="Great, we got you. Click next!"
                                        subTitle="You will have to collect order at our store"
                                        extra={<Button variant="solid" color="green" onClick={handleSubmitAddress}>Next</Button>}
                                    />)
                                    }

                                </Flex>
                            )}

                            {currentValue==1 && (
                                <Flex vertical gap={20}>
                                    <Typography.Title level={1}>Order Summary</Typography.Title>
                                    <Card title={`${shippingMode} Address`} extra={<EditOutlined />} style={{ }}>
                                        {
                                            shippingMode=='delivery' &&(
                                                    <>
                                                <p>{addressForm.getFieldValue("name")}, {addressForm.getFieldValue("phoneNumber")}</p>
                                                <p>{addressForm.getFieldValue("street")}, {addressForm.getFieldValue("city")}, {addressForm.getFieldValue("state")}, {addressForm.getFieldValue("country")} </p>
                                                </>

                                            )
                                        }
                                        {
                                            shippingMode=='pickup' &&(
                                                <p>Please, collect at our store</p>
                                            )
                                        }
                                    </Card>
                                
                                    <Row style={{backgroundColor:'white', padding:'20px'}}>
                                        <Col span={8}>
                                            <Image
                                                src={orderItem.product.imagePath}
                                            
                                                alt="Product"
                                            />
                                        </Col>
                                        <Col span={16}>
                                            <Flex vertical  gap={10} style={{}}>
                                                    <Card
                                                        style={{width:"100%", height:"100%"}}
                                                        
                                                    >
                                                    
                                                        <Meta 
                                                            title={orderItem.product.name} 
                                                            description={orderItem.product.description} 
                                                        />

                                                        <div>
                                                            <Typography.Title level={5}>Quantity</Typography.Title>
                                                            <InputNumber
                                                                defaultValue={orderItem.quantity}
                                                            />
                                                        </div>

                                                    </Card>

                                            </Flex>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            <Card variant="borderless">
                                                <Statistic
                                                title="Total Price"
                                                value={orderItem.totalPrice}
                                                precision={2}
                                                valueStyle={{ color: '#3f8600' }}
                                                suffix="TZS"
                                                />
                                            </Card>
                                        </Col>
                                        
                                        
                                    </Row>
                                    <Row>
                                        <Col span={12} style={{alignContent:'center', alignItems:'center'}}>
                                            <Button size="large" variant="solid" color="green">Confirm</Button>
                                        </Col>
                                    </Row>
                                </Flex>
                            )}

                        </Flex>
                    </Col>
                ):
                (
                    <Col span={12}>
                        <Flex vertical gap={20} style={{marginTop:"50px"}}>
                            <Steps
                                onChange={(e) => onStepChange(e)}
                                current={currentValue}
                                items={[
                                {
                                    title: 'Shiping',
                                },
                                {
                                    title: 'Summary',
                                },
                                {
                                    title: 'Payment',
                                },
                                ]}
                            />

                            {currentValue==0 && (
                                <Flex vertical>
                                    
                                    <Radio.Group
                                        onChange={(e) => handleShippingMode(e.target.value)}
                                        options={options}
                                        value={shippingMode}
                                        optionType="button"
                                        buttonStyle="solid"
                                    />

                                    <Form<AddressFormType>
                                        hidden={hideForm}
                                        form={addressForm}
                                        layout="vertical"
                                        onFinish={handleSubmitAddress}
                                    >
                                        <Form.Item 
                                            label='Name of Contact Person'
                                            name="name"
                                            rules={[{ required: true }]}
                                        >
                                            <Input size="large" type="text"></Input>
                                        </Form.Item>
                                        <Form.Item 
                                            label='Phone Number'
                                            name="phoneNumber"
                                            rules={[{ required: true }]}
                                        >
                                            <Input size="large" type="text"></Input>
                                        </Form.Item>
                                        <Form.Item 
                                            label='Street/Mtaa'
                                            name="street"
                                            rules={[{ required: true }]}
                                        >
                                            <Input size="large" type="text"></Input>
                                        </Form.Item>
                                        <Form.Item 
                                            label='City/Wilaya'
                                            name="city"
                                            rules={[{ required: true }]}
                                        >
                                            <Input size="large" type="text"></Input>
                                        </Form.Item>
                                        <Form.Item 
                                            label='State/Mkoa'
                                            name="state"
                                            rules={[{ required: true }]}
                                        >
                                            <Input size="large" type="text"></Input>
                                        </Form.Item>
                                        <Form.Item 
                                            label='Country/Nchi'
                                            name="country"
                                            initialValue={"Tanzania"}
                                            rules={[{ required: true }]}
                                        >
                                            <Input size="large" type="text" value="Tanzania" disabled></Input>
                                        </Form.Item>
                                        <Form.Item >
                                            <Button size="large" variant="solid" color="green" htmlType="submit">Submit</Button>
                                        </Form.Item>
                                    </Form>
                                    {hideForm && (
                                        <Result
                                        icon={<SmileOutlined />}
                                        title="Great, we got you. Click next!"
                                        subTitle="You will have to collect order at our store"
                                        extra={<Button variant="solid" color="green" onClick={handleSubmitAddress}>Next</Button>}
                                    />)
                                    }

                                </Flex>
                            )}

                            {currentValue==1 && (
                                <Flex vertical gap={20}>
                                    <Typography.Title level={1}>Order Summary</Typography.Title>
                                    <Card title={`${shippingMode} Address`} extra={<EditOutlined />} style={{ }}>
                                        {
                                            shippingMode=='delivery' &&(
                                                    <>
                                                <p>{addressForm.getFieldValue("name")}, {addressForm.getFieldValue("phoneNumber")}</p>
                                                <p>{addressForm.getFieldValue("street")}, {addressForm.getFieldValue("city")}, {addressForm.getFieldValue("state")}, {addressForm.getFieldValue("country")} </p>
                                                </>

                                            )
                                        }
                                        {
                                            shippingMode=='pickup' &&(
                                                <p>Please, collect at our store</p>
                                            )
                                        }
                                    </Card>
                                
                                    <Row style={{backgroundColor:'white', padding:'20px'}}>
                                        <Col span={8}>
                                            <Image
                                                src={orderItem.product.imagePath}
                                            
                                                alt="Product"
                                            />
                                        </Col>
                                        <Col span={16}>
                                            <Flex vertical  gap={10} style={{}}>
                                                    <Card
                                                        style={{width:"100%", height:"100%"}}
                                                        
                                                    >
                                                    
                                                        <Meta 
                                                            title={orderItem.product.name} 
                                                            description={orderItem.product.description} 
                                                        />

                                                        <div>
                                                            <Typography.Title level={5}>Quantity</Typography.Title>
                                                            <InputNumber
                                                                defaultValue={orderItem.quantity}
                                                            />
                                                        </div>

                                                    </Card>

                                            </Flex>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            <Card variant="borderless">
                                                <Statistic
                                                title="Total Price"
                                                value={orderItem.totalPrice}
                                                precision={2}
                                                valueStyle={{ color: '#3f8600' }}
                                                suffix="TZS"
                                                />
                                            </Card>
                                        </Col>
                                        
                                        
                                    </Row>
                                    <Row>
                                        <Col span={12} style={{alignContent:'center', alignItems:'center'}}>
                                            <Button size="large" variant="solid" color="green">Confirm</Button>
                                        </Col>
                                    </Row>
                                </Flex>
                            )}

                        </Flex>
                    </Col>
                )
            }
            
        </Row>
    );
}