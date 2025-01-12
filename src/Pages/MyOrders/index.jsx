import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../Components/Layout/index.jsx';
import { ShoppingCartContext } from '../../Context/index.jsx';
import  OrdersCard  from '../../Components/OrdersCard/index.jsx';

function MyOrders() {

    const context = useContext(ShoppingCartContext)

    return (
      <Layout>
        <div className='flex items-center justify-center relative w-80 mb-3'>
          <h1 className='font-medium text-xl'>My Orders</h1>
        </div>
        {
          context.order.map((order,index) => (
            <Link key={index} to={`/my-orders/${index}`}>
              <OrdersCard totalPrice={order.totalPrice.toFixed(2)} totalProducts={order.totalProducts}/>
            </Link>
          )) 
        }
      </Layout>
    );
  }
  
  export default MyOrders;