import { Alert, Button, Checkbox, Col, Flex, Form, Input, notification, Row, Space } from "antd";
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { CreateCustomerDto } from "../../models/user";
import { registerCustomer } from "../../services/userServices";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function CustomerRegisterPage() {
    const navigate = useNavigate();
    const [form] = Form.useForm<CreateCustomerDto>();
    const [api, contextHolder] = notification.useNotification();

    const openErrorNotification = (errorMessage:String) => {
        api['error']({
        message: `Creation Error`,
        description:`${errorMessage}`,
        duration:10
        });
    };

    const handleRegisterCustomer = async (values: CreateCustomerDto) => {

        const apiResponse = await registerCustomer(values);
        if(apiResponse.success)
            navigate('/login');
        else
            openErrorNotification(apiResponse.error);
    } 

  return (
        <Space direction="vertical" style={{ width: '100%', height: '100vh', backgroundColor:'white' }} align="center">
            <Flex  vertical style={{ height: '100vh', width:'100%'}} justify="center"
                align="center" gap={20}>

                {contextHolder}

              <Row style={{ width: '100%'}} justify={'center'}>
                <Col span={24} >
                    <h1 style={{width:'100%', fontSize:"50px", textAlign:'center'}}>ZayraCakes</h1>
                </Col>
              </Row>
              <Row style={{ width: '100%'}} justify={'center'}>

                <Col span={24} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Form<CreateCustomerDto>
                    style={{ width: '100%'}}
                    layout="vertical"
                    form={form}
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={handleRegisterCustomer}
                    size='large'
                  >
                    <Form.Item
                    name="firstName"
                    rules={[{ required: true, message: 'Please input your first name!' }]}
                    >
                        <Input  prefix={<UserOutlined />} placeholder="first Name" type='text'/>
                    </Form.Item>
                    <Form.Item
                        name="lastName"
                        rules={[{ required: true, message: 'Please input your last name!' }]}
                    >
                        <Input  prefix={<UserOutlined />} placeholder="Last Name" type='text'/>
                    </Form.Item>
                    <Form.Item
                        name="phoneNumber"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                        <Input  prefix={<PhoneOutlined />} placeholder="Phone Number" type='text'/>
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input  prefix={<MailOutlined />} placeholder="email" type='email'/>
                    </Form.Item>
                    <Form.Item
                        name="passWord"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                    </Form.Item>
                  
                    <Form.Item>
                        <Button size='large' block type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                  
                  </Form>
                </Col>
              </Row>
              
            </Flex>
        </Space>

              
            
  );
}