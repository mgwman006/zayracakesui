import { Tabs, TabsProps } from "antd";
import AddProduct from "./AddProduct";
import AdminProductList from "./AdminProductList";



export default function Admin() {
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Add Product',
            children: (<AddProduct />),
        },
        {
            key: '2',
            label: 'Product List',
            children: (<AdminProductList />),
        },
    
    ];

 
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Admin Page</h1>
        <p>Welcome to the admin page. Here you can manage products, users, and other administrative tasks.</p>
        <Tabs defaultActiveKey="1" items={items} />
        
        </div>
    );
}