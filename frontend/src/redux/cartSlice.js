// cartSlice.js
import { createListSlice } from "./listSlice";

const cartSlice = createListSlice("cart");

export const {
  add: addToCart,
  remove: removeFromCart,
  clear: clearCart,
  setItems: setCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
