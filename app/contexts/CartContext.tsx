import React, { createContext, useContext, useState } from "react";
import { addproductInCartDataToLocalStorage, getCartDataFromLocalStorage } from "../utilities/localStorage";

type CartContextType = {
  cartCount: number;
  updateCart: (item: Product) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartCount, setCartCount] = useState(getCartDataFromLocalStorage().length);

  const updateCart = (item: Product) => {
    addproductInCartDataToLocalStorage(item);
    setCartCount(getCartDataFromLocalStorage().length);
  };


  return (
    <CartContext.Provider value={{ cartCount, updateCart }}>
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
