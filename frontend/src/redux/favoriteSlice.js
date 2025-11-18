// favoriteSlice.js
import { createListSlice } from "./listSlice";

const favoriteSlice = createListSlice("favorite");

export const {
  add: addToFavorite,
  remove: removeFromFavorite,
  clear: clearFavorite,
  setItems: setFavoriteItems,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;
