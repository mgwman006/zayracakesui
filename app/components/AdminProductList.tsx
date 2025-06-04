import { useEffect, useState } from "react";
import { deleteProduct, getProducts, updateProductMetaData } from "../services/productService";
import {Image, Button, Card, Col, DatePicker, Drawer, Flex, Form, Input, List, message, Popconfirm, PopconfirmProps, Row, Select, Space } from "antd";
import { SettingOutlined, EditOutlined, EllipsisOutlined, DeleteColumnOutlined, DeleteOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { data } from "react-router";

export default function AdminProductList()
{
    const [products, setProducts] = useState<Product[]>([]);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [form] = Form.useForm<Product>();



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

    const handleDelete = async (product: Product) => {
        // Implement the delete functionality here 
        try {
            const response = await deleteProduct(product.id); // Assuming deleteProduct is a function that deletes a product by ID
            if (response.status === 200) {
                setProducts(products.filter(p => p.id !== product.id)); // Remove the deleted product from the state
                message.success(`Product ${product.name} deleted successfully`);
            } else {
                message.error(`Failed to delete product: ${response.statusText}`);
            }
            
        } catch (error) {
            console.error("Error deleting product:", error);
            message.error(`Failed to delete product: ${error}`);
        } 
    }

    const confirmDelete = (product: Product) => {
        message.success(`Deleted product: ${product.name}`);
        handleDelete(product);
    };

    const cancelDelete: PopconfirmProps['onCancel'] = (e) => {
        console.log(e);
        message.error('Click on No');
    };

    const showDrawer = (product: Product) => {
        // Set the form values to the selected product
        form.setFieldsValue({
            id: product.id, // Assuming the product has an id field
            name: product.name,
            imagePath: product.imagePath,
            price: product.price,
            description: product.description,
        });
        setOpenDrawer(true);
    };

    const onCloseDrawer = () => {
        setOpenDrawer(false);
    };

    const handUpdateProduct = async (product : Product) => {
        // Implement the update functionality here
        try {

            const productMetaData: ProductMetaDataDto = {
                name: product.name,
                description: product.description,
                price: product.price,
                imagePath: product.imagePath,
            };

            const response = await updateProductMetaData(product.id, productMetaData );
            if (response.status === 200) {
                // Update the product in the state
                const updatedProducts = response.data as Product;
                form.setFieldsValue({
                    id: updatedProducts.id, // Assuming the product has an id field
                    name: product.name,
                    imagePath: product.imagePath,
                    price: product.price,
                    description: product.description,
                }); // Reset the form fields after successful update
                alert(`Product ${product.name} updated successfully`);
                // setOpenDrawer(false);
            } else {
                alert(`Failed to update product: ${response.statusText}`);
            }
        } catch (error) {
            alert(`Failed to update product: ${error}`);
            
        }
        
    };


  return (
        <>
  
        <List
        
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
            <Image
                alt="example"
                src={item.imagePath || "https://via.placeholder.com/150" }
               
                width='100%'
                height={250}
                style={{ objectFit: 'cover', }}   

            />
            }
            actions={[
                <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={() => confirmDelete(item)}
                    onCancel={cancelDelete}
                    okText="Yes"
                    cancelText="No"
                >
                    <DeleteOutlined key="setting"  />
                </Popconfirm>
            ,
            <EditOutlined key="edit"  onClick={() => showDrawer(item)}/>,
            ]}
        >
            <Meta
                style={{ textAlign: 'center' }}
                title={<h3 style={{fontSize: '20px'}}>{item.name}</h3>}
                description={<p style={{fontSize:'20px', color:'black' }}>Price: {item.price} TZS</p>}
            />
        </Card>
      </List.Item>
    )}
  />

   
    <Drawer
        title="Create a new account"
        width={720}
        onClose={onCloseDrawer}
        open={openDrawer}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onCloseDrawer}>Cancel</Button>
           
          </Space>
        }
      >
        <Form<Product> 
            form={form}
            layout="vertical"
            onFinish={handUpdateProduct}
            initialValues={{
              name: form.getFieldValue("name"),
              imagePath: form.getFieldValue("imagePath"),
              price: form.getFieldValue("price"),
              description: form.getFieldValue("description"),
            }}
            >
            <Row >
            <Col span={12}>
              <Form.Item
                name="id"
                label="ID"
                rules={[{ required: true, message: 'Please enter user name' }]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
        
          </Row>
          <Row >
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please enter user name' }]}
              >
                <Input />
              </Form.Item>
            </Col>
        
          </Row>
          <Row >
            <Col span={12}>
              <Form.Item
                name="imagePath"
                label="Image Path"
                
              >
                <Input disabled/>
              </Form.Item>
            </Col>
           
          </Row>
          <Row >
            <Col span={12}>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: 'Please enter price' }]}
              >
                <Input  type="number" />
              </Form.Item>
            </Col>
           
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: 'please enter url description',
                  },
                ]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
               
               
              >
                <Button type="primary"  size="large" htmlType="submit">
                    Update
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
      </>
    
  );
}