import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // stores product IDs or objects with quantity if needed
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productId = action.payload;
      if (!state.items.includes(productId)) {
        state.items.push(productId);
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((id) => id !== productId);
    },
    clearCart: (state) => {
      state.items = [];
    },
    // ✅ Add this reducer
    setCartItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, setCartItems } = cartSlice.actions;
export default cartSlice.reducer;
