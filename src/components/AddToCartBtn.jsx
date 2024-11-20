import React from 'react'
import addToCartIcon from '../assets/icons/icon-add-to-cart.svg';
import incrementIcon from '../assets/icons/icon-increment-quantity.svg';
import decrementIcon from '../assets/icons/icon-decrement-quantity.svg';
import { useAppContext } from '../App';

const AddToCartBtn = ({product}) => {
    const {addToCart, updateQuantity, cart} = useAppContext()
    const isInCart = cart.find(item => item.id === product.id)

  return (
    <>
        {!isInCart ? (
            <button
            onClick={() => addToCart(product)}
            className="flex gap-5 lg:gap-2 lg:min-w-[80%] p-2 rounded-3xl w-[60%] border bg-white min-w-fit
            border-rose-950 absolute left-1/2 transform -translate-x-1/2 -top-5 align-middle
            justify-center transition duration-300"
            >
            <img src={addToCartIcon} alt="Add to cart" className="m-0" />
            <p className="text-nowrap text-sm font-bold text-red-950">Add to cart</p>
            </button>
        ) : (
            <button 
                className="flex gap-5 p-2 lg:min-w-[80%] justify-between rounded-3xl w-[60%] bg-orange-700
                border-rose-950 absolute left-1/2 transform -translate-x-1/2 -top-5 items-center transition duration-300"
            >
            <img
                onClick={() => updateQuantity(product.id, Math.max(1, isInCart.quantity - 1))}
                src={decrementIcon}
                alt="Decrement"
                className="rounded-full border border-white p-1 active:scale-110 size-5 cursor-pointer"
            />
            <p className="text-white font-bold">{isInCart.quantity}</p>
            <img
                onClick={() => updateQuantity(product.id, isInCart.quantity + 1)}
                src={incrementIcon}
                alt="Increment"
                className="rounded-full border border-white p-1 active:scale-110 size-5 cursor-pointer"
            />
            </button>
        )}
    </>
  )
}

export default AddToCartBtn
