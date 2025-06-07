import { Button, Col, Flex, Row, Tabs, TabsProps, Image, Space } from "antd";
import { OrderRequestDto } from "../../models/orders"; // Adjust the import path as necessary
import { useCart } from "../../contexts/CartContext";



export default function PaymentPage() {
    const { getOrderItems, cartCount } = useCart(); // Assuming you have a CartContext to manage cart state

    const proccessPayment = () => {
        // Implement your payment processing logic here
        const orderRequest : OrderRequestDto = {
            items: getOrderItems(), // Populate with actual order items
            totalItemCount: cartCount, // Calculate total item count
            totalAmount: getOrderItems().reduce((sum, item) => sum + (item.price * item.quantity), 0), // Calculate total amount
            contactPerson: {
                name: '', // Get from user input or context
                phone: '', // Get from user input or context
            },
            shippingAddress: {
                street: '', // Get from user input or context
                city: '', // Get from user input or context
                state: '', // Get from user input or context
                zipCode: '', // Get from user input or context
                country: '', // Get from user input or context
            }
        };
        // Here you would typically call your payment API with the orderRequest 
    };

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Mobile Money',
    children: (
        <Flex
            vertical
            
        >
            <Row>
                <Col span={24}  style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <Image
                        src="../../public/vodacom-mpesa-tanzania.jpg"
                        preview={false}
                        alt="Mobile Money Logo"
                        style={{ maxWidth: 300, height: 'auto', cursor: 'pointer', borderRadius: '10px', border: '2px solid #f0f0f0' }}
                        typeof="button"
                        onClick={() => proccessPayment()}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={24}  style={{ textAlign: 'center', marginBottom: '20px' }}>

                    <Image
                        src="../../public/airtel-money-tanzania.jpg"
                        preview={false}
                        alt="Mobile Money Logo"
                        style={{ maxWidth: 300, height: 'auto', cursor: 'pointer', borderRadius: '10px', border: '2px solid #f0f0f0' }}
                        typeof="button"
                        onClick={() => proccessPayment()}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={24}  style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <Image
                        src="../../public/mix-by-yas-tanzania.png"
                        preview={false}
                        alt="Mobile Money Logo"
                        style={{ maxWidth: 300, height: 'auto', cursor: 'pointer', borderRadius: '10px', border: '2px solid #f0f0f0' }}
                        typeof="button"
                        onClick={() => proccessPayment()}
                    />
                </Col>
            </Row>
        </Flex>
    ),
  },
  {
    key: '2',
    label: 'Credit Card',
    children: (
        <Flex
            style={{ textAlign: 'center', backgroundColor: 'white', padding: '20px', borderRadius: '8px', margin: '20px 20px' }}
        >
            <h2>Credit Card Payment</h2>
            <p>Please enter your credit card details to proceed.</p>
            <Button type="primary">Pay Now</Button>
        </Flex>
    ),
  }
];
    
    return (
        <Row style={{ textAlign: 'center', backgroundColor: 'white', padding: '20px', borderRadius: '8px', margin: '20px 20px' }}>
            <Col span={24}>
                <Tabs defaultActiveKey="1" items={items}  />
            </Col>
        </Row>
    );
}


