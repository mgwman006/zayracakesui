import api from '../api/api';

export const getProducts = () => {
  return api.get(`/product`);
};

export const addProducts = (product: FormData) => {
  return api.post(`/product`, product, 
    {
        headers: {'Content-Type': 'multipart/form-data'},
    }
    );
};

export const deleteProduct = (productId:number) => {
  return api.delete(`/product/${productId}`);
};

export const updateProductMetaData = (productId:number, productMetaData : ProductMetaDataDto) => {
  return api.put(`/product/${productId}`, productMetaData);
};