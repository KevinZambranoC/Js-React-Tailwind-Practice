import { useContext } from 'react';
import {useRoutes, BrowserRouter,Navigate} from 'react-router-dom';
import { ShoppingCartProvider, initializeLocalStorage, ShoppingCartContext } from '../../Context/index.jsx';
import Home from '../Home/index.jsx';
import MyAccount from '../MyAccount/index.jsx';
import MyOrder from '../MyOrder/index.jsx';
import MyOrders from '../MyOrders/index.jsx';
import NotFound from '../NotFound/index.jsx';
import Navbar from  '../../Components/Navbar/index.jsx';
import CheckoutSideMenu from '../../Components/CheckoutSideMenu/index.jsx';
import SignIn from '../SignIn/index.jsx';
import './App.css';

const AppRoutes = () => {
  
  const context = useContext(ShoppingCartContext);
  // Account
  const account = localStorage.getItem('account');
  const parsedAccount = JSON.parse(account);
  // Sign Out
  const signOut = localStorage.getItem('sign-out');
  const parsedSignOut = JSON.parse(signOut);
  // Has an account
  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true;
  const noAccountInLocalState = Object.keys(context.account).length === 0;
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;
  const isUserSignOut = context.signOut || parsedSignOut;

  let routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/beauty', element: <Home /> },
    { path: '/fragrances', element: <Home /> },
    { path: '/furnitures', element: <Home /> },
    { path: '/groceries', element: <Home /> },
    { path: '/others', element: <Home /> },
    { path: '/', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'} /> },
    { path: '/beauty', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'} /> },
    { path: '/fragrances', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'} /> },
    { path: '/furnitures', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'} /> },
    { path: '/groceries', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'} /> },
    { path: '/others', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'} /> },
    { path: '/my-account',element: <MyAccount/> },
    {path: '/my-order',element: <MyOrder/>},
    {path: '/my-orders',element: <MyOrders/>},
    {path: '/my-orders/last',element: <MyOrder/>},
    {path: '/my-orders/:id',element: <MyOrder/>},
    {path: '/*',element: <NotFound/>},
    {path: '/sign-in',element: <SignIn/>}
])

return routes

}

const App = () =>  {
  
  initializeLocalStorage();

  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <AppRoutes/>
        <Navbar/>
        <CheckoutSideMenu/>
      </BrowserRouter>
    </ShoppingCartProvider>
  );

}

export default App
