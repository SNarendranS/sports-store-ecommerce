import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // stores product IDs
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addToFavorite: (state, action) => {
      const productId = action.payload;
      if (!state.items.includes(productId)) {
        state.items.push(productId);
      }
    },
    removeFromFavorite: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((id) => id !== productId);
    },
    clearFavorite: (state) => {
      state.items = [];
    },
  },
});

export const { addToFavorite, removeFromFavorite, clearFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
