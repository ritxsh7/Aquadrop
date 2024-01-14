export const cartReducer = (state, action) => {
    switch (action.type) {

        case "ADD_TO_CART":
            return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };

        case "REMOVE_FROM_CART":
            return { ...state, cart: state.cart.filter(c => c.id !== action.payload.id) };

        case "CLEAR_CART":
            return {...state, cart:[]}


        case "CHANGE_CART_QTY":
            return {
                ...state,
                cart: state.cart.filter((c) =>
                    c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
                ),
            };

        case "ADD_TO_SHOPLIST":
            return {
                ...state,
                shops: [...state.shops, { ...action.payload }]
            }

        case "REMOVE_FROM_SHOPLIST":
            return {
                ...state,
                shops: [state.shops.slice(0, state.shops.length - 1)]
            }
        default:
            return state;
    }
}

export const userReducer = (state, action) => {
    switch(action.type){
        case "ADD_USER":
            return{user : action.payload}

    }
}