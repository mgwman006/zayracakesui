import { Avatar, Card, Flex, List, Space,Image,Typography, Grid, Button } from "antd";
import { SettingOutlined, EditOutlined, EllipsisOutlined, ShopOutlined, CarTwoTone, ShoppingCartOutlined, StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import Meta from "antd/es/card/Meta";
import { use, useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import { useCart } from "../../contexts/CartContext";
import { Product } from "../../models/products";
import { OrderItemDto } from "../../models/orders";
import { useNavigate } from "react-router-dom";


export default function CustomerProductList() {

    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const {cartCount,addOrderItem, updateCart, removeOrderItem, clearCart } = useCart(); // Initialize with the number of items in cart from local storage

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


    // Function to add a product to the cart
     // Function to add a product to the cart
    const addProductToCart = (product: Product) => {
             const orderItem: OrderItemDto = {
                productId: product.id,
                quantity: 1, 
                product: product, 
                totalPrice: product.price,
             };
            addOrderItem(orderItem); 
    }

    const handleBuyNow = (product: Product) => {
        navigate("/productpreview",{state:product});
    }

  return (
   <Flex style={{margin:'20px'}}>
        <List
        style={{}}
        grid={{
        gutter: 10,
        xs: 1,
        sm: 2,
        md: 2,
        lg: 4,
        xl: 4,
        xxl: 4,
        }}
        dataSource={products}
        renderItem={(item) => (
        <List.Item
            key={item.id}
            
        >
        
            <Card
                hoverable
                cover={
                    <Image
                        alt="example"
                        src={item.imagePath || "https://via.placeholder.com/150" }
                        width='100%'
                          style={{ objectFit: "cover", aspectRatio: 1 / 1 }} // add an aspect ratio

                    />
                }

                actions={[
                    <Button type="primary" onClick={() => addProductToCart(item)} color="green"   variant="solid" size="small" >
                        Add to Cart
                    </Button>,
                    <Button color="blue" onClick={() => handleBuyNow(item)} variant="solid" size="small" >
                        Buy Now
                    </Button>,
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
   </Flex>
    

  

    
  );
}

