import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentProduct : null,
    loading : false,
    error : false,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setCurrentProduct(state, action) {
            state.currentProduct = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});




export default productSlice.reducer;