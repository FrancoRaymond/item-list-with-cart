import React from 'react'
import emptyCartIllustration from '../assets/icons/illustration-empty-cart.svg';
import carbonDeliveryIcon from '../assets/icons/icon-carbon-neutral.svg';
import remove from '../assets/icons/icon-remove-item.svg';
import { useAppContext } from '../App';

const Cart = () => {
  const {cart, removeFromCart,cartQty, totalPrice, usdToRand, isModalActive,setIsModalActive} = useAppContext()
  return (
    <div className="bg-white p-3 rounded-xl flex-grow my-8 h-fit min-w-72">
        <h2 className="text-orange-700 text-2xl font-bold pb-3">Your cart({cartQty})</h2>
        {
          cart.length === 0 ? (
          <div className="my-6 w-full">
            <img
              src={emptyCartIllustration}
              alt="empty cart illustrator"
              className="h-44 mx-auto"
            />
            <p className="text-rose500 font-bold text-sm flex justify-center">Your added items will appear here</p>
          </div>
          ) : (
            cart.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-400">
              <div>
                <h1 className='text-sm font-semibold text-rose-950'>{item.name}</h1>
                <div className='text-sm mt-3'>
                  <span className='text-orange-700 font-semibold'>{item.quantity}x</span>
                  <span className='text-gray-400 mx-4'>@R{(item.price * usdToRand).toFixed(2)}</span>
                  <span className='text-gray-400 font-semibold'>R{(item.price * item.quantity * usdToRand).toFixed(2)}</span>
                </div>
              </div>
              <img
                src={remove}
                alt="Remove item"
                className="cursor-pointer border-2 border-gray-400 rounded-full p-1 h-6 w-6"
                onClick={() => removeFromCart(item.id)}
              />
            </div>
          )))
        }
        {
        cart.length > 0 ? (
          <div className='flex flex-col w-full mt-6'>
            <div className='flex justify-between'>
              <span className='text-gray-400'>Order Total</span>
              <span className='font-bold text-xl'>R{totalPrice}</span>
            </div>
            <div className='flex gap-4 justify-center mt-5 bg-gray-50 py-4 rounded-lg'>
              <img src={carbonDeliveryIcon} alt="" />
              <span className='text-rose-950 text-sm'>this is a <strong className='font-bold'>carbon neutral</strong> delivery</span>
            </div>
            <button 
              onClick={() => setIsModalActive(true)}
              className='mt-6 bg-orange-700 hover:bg-orange-800 transition duration-100 text-white rounded-full py-2 font-semibold'>Confirm order
            </button>
          </div>
        ) : null
        }
      </div>
  )
}

export default Cart
