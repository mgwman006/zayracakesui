
import { useNavigate } from 'react-router-dom';
import { UserStatus, type LogInDetails } from '../../models/user';
import { logInUser } from '../../services/userServices';
import { Button, Checkbox, Col, Flex, Form, Grid, Input, notification, Row, Space, type FormInstance } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useUserContext } from '../../contexts/UserContext';
const { useBreakpoint } = Grid;



export default function LogIn() {

  const screens = useBreakpoint(); // Get the current screen size for responsive design

  const { setUserStatus, setUser } = useUserContext(); // Get user status and login state from context

  const navigate = useNavigate();

  const [form]: [FormInstance<LogInDetails>] = Form.useForm<LogInDetails>();
  const [api, contextHolder] = notification.useNotification();

    const openErrorNotification = (errorMessage:String) => {
        api['error']({
        message: `Creation Error`,
        description:`${errorMessage}`,
        duration:10
        });
    };

   const handleLogIn = async (vallues:LogInDetails) => {
    
    const logInDetails: LogInDetails = {
      email: vallues.email,
      passWord: vallues.passWord
    }
    
    const apiResponse = await logInUser(logInDetails);

    if(apiResponse.success)
    {
      setUserStatus(UserStatus.LoggedIn);
      navigate("/");
    }
      
    else
    {
      openErrorNotification(apiResponse.error);

    }
   
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
                  <Form<LogInDetails>
                    style={{ width: '100%'}}
                    layout="vertical"
                    form={form}
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={handleLogIn}
                    size='large'
                  >
                  <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                  >
                    <Input  prefix={<UserOutlined />} placeholder="email" type='email'/>
                  </Form.Item>
                  <Form.Item
                    name="passWord"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                  >
                    <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                  </Form.Item>
                  <Form.Item>
                    <Flex justify="space-between" align="center">
                      <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                      </Form.Item>
                      <a href="/resetpassword" >Forgot password</a>
                    </Flex>
                  </Form.Item>
                  <Form.Item>
                    <Button size='large' block type="primary" htmlType="submit">
                      Log in
                    </Button>
                  </Form.Item>
                  <Form.Item>
                      <Button color='green' href="/registercustomer" variant='outlined'>Register now!</Button>
                  </Form.Item>
                  </Form>
                </Col>
              </Row>
              
            </Flex>
        </Space>

              
            
  );
}
