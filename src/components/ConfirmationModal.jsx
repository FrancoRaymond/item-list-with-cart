import React from 'react'; 
import successIcon from '../assets/icons/icon-order-confirmed.svg';
import { useAppContext } from '../App';

const ConfirmationModal = () => {
  const { cart, setCart, totalPrice, usdToRand, isModalActive, setIsModalActive } = useAppContext();

  const resetApp = () => {
    setCart([]);
    setIsModalActive(false);
  };

  return (
    <div
      className={`${isModalActive ? 'fixed' : 'hidden'} inset-0 p-2 sm:p-5 min-h-screen flex items-center justify-center w-full bg-black bg-opacity-50`}
      aria-hidden={!isModalActive}
    >
      <div
        className={`${isModalActive ? 'animate-popIn' : 'opacity-0'} bg-white rounded-xl p-2 sm:p-5 max-w-lg w-full max-h-[80vh] overflow-auto styled-scrollbar`}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={successIcon} alt="Order confirmed" className="w-10 h-10 mx-auto" />
        <h2 className="text-2xl font-extrabold mt-3 text-center" aria-label="Order Confirmed">Order Confirmed</h2>
        <p className="text-gray-400 mt-2 text-sm text-center">We hope you enjoy your food!</p>
        
        <div className="bg-rose-50 p-2 sm:p-4 rounded-xl mt-5">
          {cart.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-400">
              <div className="flex gap-4">
                <img src={item.image.thumbnail} alt={item.name} className="w-12 h-12 sm:w-14 sm:h-14" />
                <div>
                  <h1 className="text-sm font-semibold text-rose-950 pr-3">{item.name}</h1>
                  <div className="text-sm mt-3">
                    <span className="text-orange-700 font-semibold">{item.quantity}x</span>
                    <span className="text-gray-400 mx-4">@R{(item.price * usdToRand).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <span className="text-rose-950 font-semibold">R{(item.price * item.quantity * usdToRand).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between pt-8 pb-4">
            <span className="text-gray-400">Order Total</span>
            <span className="font-bold text-xl">R{totalPrice}</span>
          </div>
        </div>
        
        <button 
          onClick={resetApp}
          className="mt-6 bg-orange-700 hover:bg-orange-800 transition duration-100 text-white rounded-full py-2 font-semibold w-full"
        >
          Start New Order
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
