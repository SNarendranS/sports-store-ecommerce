// import { createSlice } from '@reduxjs/toolkit';

// const storedUser =
//   localStorage.getItem("userData") || sessionStorage.getItem("userData");

// const loggedInSlice = createSlice({
//   name: 'userToken',
//   initialState: { value: storedUser },
//   reducers: {
//     setToken: (state, action) => {
//       state.value = action.payload;
//     },
//     getToken: (state) => {
//       return state.value;
//     },
//     removeToken: (state) => {
//       state.value = null;
//     },
//     isLoggedIn: (state) => {
//       return state.value !== null;
//     }

//   }
// });

// export const { setToken, getToken,removeToken, isLoggedIn } = loggedInSlice.actions;
// export default loggedInSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const storedUser =
  localStorage.getItem("userData") || sessionStorage.getItem("userData");

const loggedInSlice = createSlice({
  name: 'isLoggedIn',
  initialState: { value: storedUser },
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.value = action.payload;
    }

  }
});

export const { setIsLoggedIn } = loggedInSlice.actions;
export default loggedInSlice.reducer;
