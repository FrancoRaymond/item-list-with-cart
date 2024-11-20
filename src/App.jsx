import React, { useState, createContext, useContext } from 'react';
import ProductSection from './Components/ProductSection';
import ConfirmationModal from './Components/ConfirmationModal';
import Cart from './Components/Cart';


const AppContext = createContext()

const App = () => {
  const [cart, setCart] = useState([]); 
  const [isModalActive, setIsModalActive] = useState(false)

  const usdToRand = 18.5;
  const cartQty = cart.reduce((totalQty, currentQty) => totalQty + currentQty.quantity, 0)

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity * usdToRand, 0).toFixed(2);

  return (
    <AppContext.Provider
      value={
        {
          cart, 
          totalPrice, 
          cartQty, 
          usdToRand,
          isModalActive, 
          setIsModalActive,
          addToCart, 
          updateQuantity, 
          removeFromCart,
          setCart
        }
      }
    >
      <div className='lg:flex gap-10  lg:px-20 relative pb-10'>
        <ProductSection />
        <Cart/>
      </div>
      <ConfirmationModal />
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext)
}

export default App;
