export const getProduct = (state, key) => state.products.find(product => Number(key) === product.id);

export const getCartProducts = state => {
    return Object.keys(state.cart).map(
        key => ({
            ...getProduct(state, key) || {},
            quantity: state.cart[key]
        })
    );
};

export const getTotal = state => {
    return parseFloat(
        getCartProducts(state).reduce(
            (total, product) => total + product.price * product.quantity,
            0
        )
        .toFixed(2)
    );
};
