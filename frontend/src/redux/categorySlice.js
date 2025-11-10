import { createSlice } from '@reduxjs/toolkit';
const categorySlice = createSlice({
    name: 'category',
    initialState: { value: '' },
    reducers: {
        setCategoryValue: (state, action) => {
            state.value = action.payload;
        }

    }
});
export const { setCategoryValue } = categorySlice.actions;
export default categorySlice.reducer;
