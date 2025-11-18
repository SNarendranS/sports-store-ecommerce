// listSliceFactory.js
import { createSlice } from "@reduxjs/toolkit";

export const createListSlice = (name) =>
  createSlice({
    name,
    initialState: { items: [] },
    reducers: {
      add: (state, action) => {
        const product = action.payload;
        if (!product?.productid) return; // ignore invalid payload
        if (!state.items.some((item) => item.productid === product.productid)) {
          state.items.push(product);
        }
      },
      remove: (state, action) => {
        const product = action.payload;
        if (!product?.productid) return;
        state.items = state.items.filter((item) => item.productid !== product.productid);
      },

      clear: (state) => {
        state.items = [];
      },
      setItems: (state, action) => {
        state.items = action.payload;
      },
    },
  });
