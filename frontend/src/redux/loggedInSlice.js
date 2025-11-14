import { createSlice } from '@reduxjs/toolkit';

const storedUser =
  localStorage.getItem("userData") || sessionStorage.getItem("userData");

const loggedInSlice = createSlice({
  name: 'isLoggedIn',
  initialState: { value: !!storedUser },   // convert to boolean
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { setIsLoggedIn } = loggedInSlice.actions;
export default loggedInSlice.reducer;
