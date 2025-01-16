import { use } from "react";
import {  createContext, useState, useEffect } from "react";

export const ShoppingCartContext = createContext()

//initilize LocalStorage
export const initializeLocalStorage = () => {

    const accountInLocalStorage = localStorage.getItem('account')
    const signOutInLocalStorage = localStorage.getItem('sign-out')
    let parsedAccount
    let parsedSignOut

    if(!accountInLocalStorage){
        localStorage.setItem('account', JSON.stringify({}))
        parsedAccount = {}
    } else {
        parsedAccount = JSON.parse(accountInLocalStorage)
    }

    if(!signOutInLocalStorage){
        localStorage.setItem('sign-out',JSON.stringify(false))
        parsedSignOut = false
    } else {
        parsedSignOut = JSON.parse(signOutInLocalStorage)
    }

}

export const ShoppingCartProvider = ({children}) => {

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => {
            setItems(data.products); // Accede a la propiedad 'products'
            console.log(data.products); // Verifica que los datos sean correctos
        })
          .catch(error => console.error('Error fetching products:', error)); // Manejo de errores
    }, []);
    
    //My Account
    const [account,setAccount] = useState({})

    //Sign Out
    const [singOut,setSignOut] = useState(false)

    //Product Detail  Open/Close
    const [ isProductDetailOpen, setIsProductDetailOpen ] = useState(false);
    const openProductDetail = () => setIsProductDetailOpen(true);
    const closeProductDetail = () => setIsProductDetailOpen(false);

    //Checkout Side Menu  Open/Close
    const [ isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen ] = useState(false);
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

    //Product Detail  Show Products
    const [ productToShow, setProductToShow] = useState({});

    //Shoppi Cart Add products to cart
    const [ cartProducts, setCartProducts] = useState([]);

    //Shoppi Cart Order
    const [ order, setOrder] = useState([]);

    //Shopping Cart Increment quantity
    const [ count, setCount ] = useState(0);
    
    // Get Products
    const [filteredItems, setFilteredItems] = useState(null);
    
    //
    const [items, setItems] = useState(null);
    
    // Get products by title
    const [searchByTitle, setSearchByTitle] = useState(null);

    // Get products by categories
    const [searchByCategory, setSearchByCategory] = useState(null);

    const filteredItemsByTitle = (items, searchByTitle) => {
        return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }

    const filteredItemsByCategory = (items, searchByCategory) => {
        return items?.filter(item => item.category.toLowerCase().includes(searchByCategory.toLowerCase()))
    }
    
    const filterBy = (searchType,items, searchByTitle,searchByCategory) => { 
        if(searchType === 'BY_TITLE'){
            return filteredItemsByTitle(items,searchByTitle)
        }

        if(searchType === 'BY_CATEGORY'){
            return filteredItemsByCategory(items,searchByCategory)
        }

        if(searchType === 'BY_TITLE_AND_CATEGORY'){
            return filteredItemsByCategory(items,searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
        }

        if(!searchType){
            return items
        }
    }

    useEffect(()=> { 
        
        if (searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY',items,searchByTitle,searchByCategory))
        if (searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE',items,searchByTitle,searchByCategory))
        if (!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY',items,searchByTitle,searchByCategory))
        if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null,items,searchByTitle,searchByCategory))

    },[items,searchByTitle,searchByCategory])

    return(
        <ShoppingCartContext.Provider 
        value={{
            count,setCount,openProductDetail,closeProductDetail, isProductDetailOpen,productToShow,setProductToShow, cartProducts, setCartProducts,isCheckoutSideMenuOpen,openCheckoutSideMenu,closeCheckoutSideMenu,order, setOrder,items,setItems,searchByTitle, setSearchByTitle,filteredItems,setFilteredItems,searchByCategory,setSearchByCategory,account,setAccount,singOut,setSignOut
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )

}