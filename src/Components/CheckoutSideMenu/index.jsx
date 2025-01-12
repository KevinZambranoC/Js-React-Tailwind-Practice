import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './styles.css'
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context/index.jsx';
import OrderCard from '../OrderCard/index.jsx';
import totalPrice from '../../utils/index.js';

const  CheckoutSideMenu = () => {
    
    const context = useContext(ShoppingCartContext)
    
    const handleDelete = (id) => {
        const filteredProducts = context.cartProducts.filter(product => product.id != id);
        context.setCartProducts(filteredProducts)
    }

    const handleCheckout = () => {
        const orderToAdd = {
            date : '01.02.23',
            products: context.cartProducts,
            totalProducts: context.cartProducts.length,
            totalPrice: totalPrice(context.cartProducts)
        }

        context.setOrder([...context.order,orderToAdd])
        context.setCartProducts([])
        context.setSearchByTitle(null)
    }
    
    return(
        <aside className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} checkout-side-menu flex-col fixed right-0 border border-black rounded-lg bg-white`}>
            <div className='flex justify-between items-center p-6'>
                <h2 className='font-medium text-xl'>My Order</h2>
                <div onClick={() => context.closeCheckoutSideMenu()} className='cursor-pointer flex justify-center items-center bg-gray-100 w-8 h-8 rounded-full'>
                    <XMarkIcon className='h-5 w-5 text-black'></XMarkIcon>
                </div>
            </div>
            <div className='px-6 overflow-y-scroll  scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300 scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
                {
                    context.cartProducts.map( product => (<OrderCard key={product.id} id={product.id} title={product.title} imageUrl={product.images} price ={product.price} handleDelete={handleDelete}/>))
                }
            </div>
            <div className='p-6 border-t border-gray-200 mt-auto'>
                <div className='flex justify-between items-center mb-4'>
                    <span className='text-lg font-medium'>Total:</span>
                    <span className='text-xl font-bold'>${totalPrice(context.cartProducts).toFixed(2)}</span>
                </div>
                <Link to='/my-orders/last'>
                    <button onClick={() => handleCheckout()} className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300'>
                        Checkout
                    </button>
                </Link>
            </div>
        </aside>
    )

}

export default CheckoutSideMenu