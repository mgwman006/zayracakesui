import { Button, Form, Upload, UploadProps } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { addProducts } from "../../services/productService";
import { useState } from "react";





export default function AddProduct() {

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [image, setImage] = useState<File | null>(null);


    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price.toString());
        if (image) {
            formData.append('image', image);
        }

        console.log('Form Data:', formData);

        try {
            const response = await addProducts(formData);
            if (response.status === 201) {
                alert('Product added successfully!');
            }
            else {
                alert(`Failed to add product: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert(`Failed to add product: ${error}`);
            
        }
    }

    const props: UploadProps = {
  listType: 'picture',

  previewFile(file: File | Blob) {
    console.log('Previewing file:', file);

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
    });
  },

  customRequest({ file, onSuccess }) {
    console.log('Intercepted file upload:', file);

    if (file instanceof File) {
      setImage(file); // ← This is where you save the file
    }

    // Tell AntD the upload succeeded (to show UI feedback)
    setTimeout(() => {
      onSuccess?.('ok');
    }, 0);
  },
};

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Add New Product</h2>
      <Form >
        <Form.Item
          name="name">
          <input type="text" placeholder="name" required onChange={(e) => setName(e.target.value)}/>
        </Form.Item>
        <Form.Item
          name="description">
          <textarea  placeholder="description" required  onChange={(e) => setDescription(e.target.value)}></textarea>
        </Form.Item>
        <Form.Item
          name="price">
          <input type="number" placeholder="price"  required onChange={(e) => setPrice(Number(e.target.value))}/>
        </Form.Item>
         <Form.Item
        name="image"
        // valuePropName="fileList"
        // getValueFromEvent={(e) => {
        //   const fileList = Array.isArray(e) ? e : e?.fileList;
        //   return fileList?.[0]; // ✅ extract raw File
        // }}
        rules={[{ required: true, message: 'Please upload an image' }]}
      >
        <Upload {...props}>
            <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
      </Form.Item>
        <Form.Item>
            <Button type="primary" onClick={handleSubmit}>Add Product</Button>
        </Form.Item>
      </Form>
    </div>
  );
}