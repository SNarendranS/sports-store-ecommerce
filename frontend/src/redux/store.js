import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import categoryReducer from './categorySlice'
import loggedInReducer from './loggedInSlice';
import cartReducer from './cartSlice'
import favoriteReducer from './favoriteSlice'

export const store = configureStore({
  reducer: {
    search: searchReducer,
    cart: cartReducer,
    favorite: favoriteReducer,
    category:categoryReducer,
    login: loggedInReducer,
  },
});