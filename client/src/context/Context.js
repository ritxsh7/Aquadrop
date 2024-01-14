import {createContext} from "react"
import { useReducer , useContext} from "react";
import React from 'react'
import Stores from '../static/data.js';
import { cartReducer, userReducer } from "./Reducer.js";


const Cart = createContext();

export const Context = ({children}) => {

    const products = Stores.map((store) => (store.products));
    const shops = Stores;

    const [state, dispatch] = useReducer(cartReducer, {
        shops : shops,
        products : products,
        cart : []
    })

    const [user, dispatchUser] = useReducer(userReducer,{
      user:''
    })

    console.log(user);
    
  return (
    <Cart.Provider value={{state, dispatch, user, dispatchUser }}>
        {children}
    </Cart.Provider>
  )
};
export default Context;

export const CartState = () => {
    return useContext(Cart);
}
