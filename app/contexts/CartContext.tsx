import React, { createContext, useContext, useState } from "react";
import { OrderItemDto } from "../models/products";
import { l } from "react-router/dist/development/lib-C1JSsICm.mjs";

type CartContextType = {
  cartCount: number;
  addOrderItem: (item: OrderItemDto) => void;
  updateCart: (items: OrderItemDto[]) => void;
  removeOrderItem: (productId: number) => void;
  clearCart: () => void;
  getOrderItems: () => OrderItemDto[];

};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const [cartCount, setCartCount] = useState(() => {
    const currentItems = localStorage.getItem("cartData");
    if (currentItems) {
      const items: OrderItemDto[] = JSON.parse(currentItems);
      return items.reduce((total, currentItem) => total + currentItem.quantity, 0);
    }
    return 0;
  });

  const updateCart = (items: OrderItemDto[]) => {
    localStorage.setItem("cartData", JSON.stringify(items));
    const updatedCartCount = items.reduce((total, currentItem) => total + currentItem.quantity, 0);
    setCartCount(updatedCartCount);
  };

  const addOrderItem = (item: OrderItemDto) => {
    const currentItems = localStorage.getItem("cartData");
    let items: OrderItemDto[] = currentItems ? JSON.parse(currentItems) : [];
    const existingItemIndex = items.findIndex(i => i.productId === item.productId);
    if (existingItemIndex > -1) {
      // If the item already exists, increment the quantity and update the total price
      items[existingItemIndex].quantity += 1;
      items[existingItemIndex].totalPrice += item.product.price;
    } else {
      // If it doesn't exist, add it to the cart
      items.push(item);
    }
    localStorage.setItem("cartData", JSON.stringify(items));
    const updatedCartCount = items.reduce((total, currentItem) => total + currentItem.quantity, 0);
    setCartCount(updatedCartCount);
  };

  const removeOrderItem = (productId: number) => {
    const currentItems = localStorage.getItem("cartData");
    let items: OrderItemDto[] = currentItems ? JSON.parse(currentItems) : [];
    items = items.filter(item => item.productId !== productId);
    localStorage.setItem("cartData", JSON.stringify(items));
    const updatedCartCount = items.reduce((total, currentItem) => total + currentItem.quantity, 0);
    setCartCount(updatedCartCount);
  };

  const clearCart = () => {
    localStorage.removeItem("cartData");
    setCartCount(0);
  };

  const getOrderItems = (): OrderItemDto[] => {
    const currentItems = localStorage.getItem("cartData"); 
    return currentItems ? JSON.parse(currentItems) as OrderItemDto[] : [];
  };

  return (
    <CartContext.Provider value={{ cartCount, updateCart, addOrderItem, removeOrderItem, clearCart, getOrderItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
