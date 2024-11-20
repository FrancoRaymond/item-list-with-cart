import React,{useState, useEffect} from 'react'
import AddToCartBtn from './AddToCartBtn';
import { data }  from '../data/data.js';
import { useAppContext } from '../App.jsx';

const ProductSection = () => {
    const { cart, usdToRand } = useAppContext()
    const [size, setSize] = useState(window.innerWidth);
    const [productImage, setProductImage] = useState('');
    
    const handleResize = () => {
        setSize(window.innerWidth);
      };
    
      useEffect(() => {
        window.addEventListener('resize', handleResize);
    
        if (size < 640) {
          setProductImage('mobile');
        } else if (size <= 1024) {
          setProductImage('tablet');
        } else {
          setProductImage('desktop');
        }
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, [size]);
  return (
    <div className="px-2 py-5 max-w-[800px] mx-auto">
      <h1 className="text-red-950 text-3xl font-bold mb-5">Desserts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map(product => {

          const isInCart = cart.find(item => item.id === product.id);

          return (
            <div key={product.id} className=" rounded-lg">
              <img
                src={product.image[productImage]}
                className={`${!isInCart ? "" : 'border-2 border-orange-700'} h-auto w-full rounded-xl outline-none`}
                alt={product.name}
              />
              <div className="py-6 relative">
                <AddToCartBtn product={product} />
                <p className="text-gray-500 mt-5">{product.category}</p>
                <p className="text-rose-950 font-bold">{product.name}</p>
                <p className="text-orange-700 font-semibold">R{(product.price * usdToRand).toFixed(2)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default ProductSection
