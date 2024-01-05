import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  price: 0,
  total: 0,
};

const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //================REDUCER FOR REMOVING ALL ITEMS =================================
    clearCart: (state) => {
      state.items = [];
    },

    //=============REDUCER FOR ADDING AN ITEM IN CART-==========================
    addTocart: (state, { payload }) => {
      console.log(payload);
      const { count, _id, price, image, name, description, shopId } = payload;

      //check if item is already present
      let checkItemInCart = current(state).items.find(
        (item) => item.id === _id
      );

      //if present then only modify quantity of the item don't add it
      if (checkItemInCart) {
        //filter remaining items except the one which is present
        let newItems = current(state).items.filter((item) => item.id !== _id);
        console.log(newItems);

        //modify quantity
        const newQty = checkItemInCart.qty + count;
        checkItemInCart = { ...checkItemInCart, qty: newQty };
        console.log(checkItemInCart);

        //update the items array
        newItems = [...newItems, checkItemInCart];
        state.items = newItems;
      } else {
        //else if item is not present simply push it in the array
        state.items.push({
          id: _id,
          qty: count,
          name: name,
          mrp: price,
          image: image,
          description: description,
          shopId,
        });
        console.log(current(state).items);
      }
    },

    //==============REDUCER FOR REMOVING FROM CART==================
    removeCart: (state, { payload }) => {
      console.log(payload);
      const newItems = state.items.filter((item) => item.id !== payload);
      console.log(newItems);
      state.items = newItems;
    },

    //===========REDUCER FOR CALCULATING TOTAL======================
    calculateTotal: (state, action) => {
      let total = 0;
      let price = 0;
      state.items.forEach((item) => {
        total = total + item.qty;
        price = price + item.mrp * item.qty;
      });
      state.total = total;
      state.price = price;
      console.log(current(state));
    },
  },
});

//exports
export default cartReducer.reducer;

export const { addTocart, calculateTotal, removeCart, clearCart } =
  cartReducer.actions;
