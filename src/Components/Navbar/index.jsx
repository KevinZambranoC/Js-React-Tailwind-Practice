import { NavLink } from "react-router-dom"
import { useContext } from 'react';
import { ShoppingCartContext} from '../../Context/index.jsx';
import ShoppingCart from "../ShoppingCart/index.jsx";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";

const Navbar = () => {

    const activeStyle = 'cursor-pointer underline underline-offset-4';
    const context = useContext(ShoppingCartContext)

    // Sign Out
    const singOut = localStorage.getItem('sign-out');
    const parsedSignOut = JSON.parse(singOut);
    const isUserSignOut = context.singOut || parsedSignOut;

    //Account
    const account = localStorage.getItem('account');
    const parsedAccount = JSON.parse(account);
    //Has an account
    const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true;
    const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true;
    const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;

    const handleSignOut = () => {
        const stringifiedSignOut = JSON.stringify(true)
        localStorage.setItem('sign-out',stringifiedSignOut)
        context.setSignOut(true)
    }
    
    const renderView = () => {
        if ( hasUserAnAccount && !isUserSignOut) {
            return (
                <>
                <li className='text-black/60'>
                    {parsedAccount?.email}
                </li>
                <li>
                    <NavLink to='/my-orders' className={({ isActive }) => isActive ? activeStyle : undefined}>
                        My Orders
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/my-account' className={({ isActive }) => isActive ? activeStyle : undefined}>
                        My Account
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/sign-in' className={({ isActive }) => isActive ? activeStyle : undefined} onClick={() => handleSignOut()}>
                        Sign out
                    </NavLink>
                </li>
                </>
                )
        } else {
            return (
                <li>
                    <NavLink
                        to="/sign-in"
                        className={({ isActive }) => isActive ? activeStyle : undefined }
                        onClick={() => handleSignOut()}>
                            Sign In
                    </NavLink>
                </li>
                )
            }
        }

    return (
        <nav className="flex justify-between items-center fixed z-10 top-0 w-full py-4 px-8 text-sm font-light bg-white border border-b-gray-200">
            <ul className="flex items-center gap-3">
                <li className="font-semibold text-lg">
                    <NavLink to={`${isUserSignOut ? '/sign-in' : '/'}`}>
                        Shopi
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/' onClick={() => context.setSearchByCategory()} className = {({ isActive }) => isActive ? activeStyle : undefined}>
                        All
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/beauty' onClick={() => context.setSearchByCategory('beauty')} className = {({ isActive }) => isActive ? activeStyle : undefined}>
                        Beauty
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/fragrances' onClick={() => context.setSearchByCategory('fragrances')} className = {({ isActive }) => isActive ? activeStyle : undefined}>
                        Fragrances
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/furnitures' onClick={() => context.setSearchByCategory('furniture')} className = {({ isActive }) => isActive ? activeStyle : undefined}>
                        Furnitures
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/groceries' onClick={() => context.setSearchByCategory('groceries')} className = {({ isActive }) => isActive ? activeStyle : undefined}>
                        Groceries
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/others' onClick={() => context.setSearchByCategory()} className = {({ isActive }) => isActive ? activeStyle : undefined}>
                        Others
                    </NavLink>
                </li>
            </ul>
            <ul className='flex items-center gap-3'>
                {renderView()}
                <li className='flex items-center'>
                    <ShoppingCart/>
                </li>             
            </ul>
        </nav>
    )
}

export default Navbar