
export const totalPrice = (cartProducts) => {

    return cartProducts.reduce((acc, product) => {
        const price = typeof product.price === 'number' ? product.price : 0;
        return acc + price
    }, 0);
}

export default totalPrice;