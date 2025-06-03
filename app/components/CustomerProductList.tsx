import { Avatar, Card, Flex, List, Space } from "antd";
import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import Meta from "antd/es/card/Meta";
import { use, useEffect, useState } from "react";
import { getProducts } from "../services/productService";


export default function CustomerProductList() {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        // Fetch products or any initial data here if needed
        const fetchProducts = async () => {
            try {
                const response = await getProducts(); 
                if (response.status === 200) {
                    const data = response.data as Product[]; // Assuming the API returns an array of products
                    console.log("Products fetched successfully:", data);
                    setProducts(data); // Assuming the API returns an array of products
                } else {
                    console.error("Failed to fetch products:", response.statusText);
                }
            }
            catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);


  return (

        <List
        
        grid={{
        gutter: 10,
        xs: 1,
        sm: 1,
        md: 1,
        lg: 4,
        xl: 4,
        xxl: 4,
        }}
    dataSource={[...products]}
    renderItem={(item) => (
      <List.Item
        key={item.id}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding:20 } }
      >
        <Card
            style={{ width: 250}}
            cover={
            <img
                alt="example"
                src={item.imagePath || "https://via.placeholder.com/150" }
                style={{ width: '100%', height: 200, objectFit: 'cover'}}

            />
            }
            actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
            ]}
        >
            <Meta
            title={item.name}
            description={`Price: ${item.price} TZS`}
            />
        </Card>
      </List.Item>
    )}
  />

  

    
  );
}