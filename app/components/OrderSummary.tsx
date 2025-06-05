import { List } from "antd";
import { OrderItemDto } from "../models/products";

export default function OrderSummary() {
    const orderItems: OrderItemDto[] = JSON.parse(localStorage.getItem('cartData') || '[]');
    const totalPrice = orderItems.reduce((total, item) => total + item.totalPrice, 0);

  return (
    <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', margin: '20px 20px' }}>
      <List
        header={<h2>Order Summary</h2>}
        bordered
        dataSource={orderItems}
        footer={<div style={{ fontWeight: 'bold' }}>Total Price: {totalPrice.toFixed(2)} TZS</div>}
        style={{ width: '100%' }}
        renderItem={(item) => (
          <List.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <span>{item.product.name} (x{item.quantity})</span>
              <span>{item.totalPrice.toFixed(2)} TZS</span>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}