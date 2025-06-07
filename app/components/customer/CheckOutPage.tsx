import { Button, message, Steps, theme } from "antd";
import { useCart } from "../../contexts/CartContext";
import { useState } from "react";
import OrderSummary from "../common/OrderSummary";
import ShippingMethods from "../common/ShippingMethods";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import PaymentPage from "./PaymentPage";


const steps = [
    {
        title: 'Order Summary',
        content: <OrderSummary />, // Placeholder, will be updated with actual order items
    },
    {
        title: 'Shipping Method',
        content: <ShippingMethods />, // Placeholder, will be updated with actual shipping methods
    },
    {
        title: 'Payment',
        content: <PaymentPage />, // Placeholder, will be updated with actual payment methods
    },
    {
        title: 'Done',
        content: 'Last-content',
    },
];

export default function CheckOutPage() {
    // use usecart hook to manage cart state if needed
    const { cartCount, addOrderItem, updateCart, removeOrderItem, clearCart, getOrderItems } = useCart();
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);

    const next = () => {
    setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const items = steps.map((item) => ({ key: item.title, title: item.title }));


    return (
    <>
      <Steps current={current} items={items} />
      {steps[current].content}
      <div >
        {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()} variant="outlined" color="primary">
            <LeftOutlined />Previous
          </Button>
        )}
        {(current < steps.length - 2)  && (
          <Button type="primary" onClick={() => next()}>
            Next <RightOutlined />
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        
      </div>
    </>
  );
}