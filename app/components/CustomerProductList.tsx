import { Avatar, Card, Flex, List, Space,Image,Typography, Grid, Button } from "antd";
import { SettingOutlined, EditOutlined, EllipsisOutlined, ShopOutlined, CarTwoTone, ShoppingCartOutlined } from '@ant-design/icons';
import Meta from "antd/es/card/Meta";
import { use, useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { useCart } from "../contexts/CartContext";


export default function CustomerProductList() {


    const [products, setProducts] = useState<Product[]>([]);
    const {cartCount, updateCart} = useCart(); // Initialize with the number of items in cart from local storage

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


  // Decide title size based on screen

    const addProductToCart = (item: Product) => {
             updateCart(item); // Update the cart context
    }

  return (

        <List
            style={{ paddingTop: 50, paddingLeft: 50, paddingRight: 50 }}
        
        grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 2,
        lg: 4,
        xl: 4,
        xxl: 4,
        }}
    dataSource={[...products]}
    renderItem={(item) => (
      <List.Item
        key={item.id}
        style={{ 
            border: '1px solid black',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',}}
      
      >
        <Card
            style={{ width: '100%', height: '100%' }}
        
            cover={
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                     <Image
                        alt="example"
                        src={item.imagePath || "https://via.placeholder.com/150" }
                        width='100%'
                        height={250}
                        style={{ objectFit: 'cover', }}                
                    />
                </div>
           
            }
            actions={[

           
            <Button type="primary" onClick={() => addProductToCart(item)} color="green" icon={<ShoppingCartOutlined />}  variant="outlined" size="large" >
                Add to Cart
            </Button>,
             <Button color="blue" onClick={() => addProductToCart(item)} variant="outlined" size="large" >
                Buy Now
            </Button>,
            ]}
        >
            <div onClick={() => alert(`Clicked on product: ${item.name}`)} style={{ cursor: 'pointer' }}>
                <Meta
                    style={{ textAlign: 'center' }}
                    title={<h3 style={{fontSize: '20px'}}>{item.name}</h3>}
                    description={<p style={{fontSize:'20px', color:'black' }}>Price: {item.price} TZS</p>}
                />
            </div>
            
         
            
        </Card>
      </List.Item>
    )}
  />

  

    
  );
}

