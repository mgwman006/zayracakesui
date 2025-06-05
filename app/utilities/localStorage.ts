// import { Product } from "../models/product";

// export const saveToLocalStorage = (key:string, value:string) => {
    
// if (typeof window !== 'undefined') 
//     localStorage.setItem(key, value);
// };

// export const getFromLocalStorage = (key:string) => {
//     let data : string | null = null;
//     if (typeof window !== 'undefined') 
//          data = localStorage.getItem(key);
//     return data ? data : null;
// };

// export const removeFromLocalStorage = (key:string) => {
//     if (typeof window !== 'undefined') 
//         localStorage.removeItem(key);
// };

// export const getCartDataFromLocalStorage = (): Product[] => {
//     let data: string | null = null;
//     if (typeof window !== 'undefined') 
//         data = localStorage.getItem('cart');
//     return data ? JSON.parse(data) as Product[]: [];
// }

// export const addproductInCartDataToLocalStorage = (product:Product) => {
//     let data: string | null = null;
//     if (typeof window !== 'undefined') 
//         data = localStorage.getItem('cart');
//     let products : Product[] = data ? JSON.parse(data) as Product[]: [];
//     products.push(product);
//     localStorage.setItem('cart', JSON.stringify(products));
// }
