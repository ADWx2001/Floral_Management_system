import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
// import axios from "axios";

const initialState = {
    items: [],
    status :null,
    error : null,
};


export const productFetch = createAsyncThunk(
    "products/productsFetch",
    async (_, { signal }) => {
      const response = await fetch("/api/products/getproducts", { signal });
      return response?.data;
    }
    
);

const productsSlice = createSlice({
    name :"products",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
          .addCase(productFetch.pending, (state, action) => {
            state.status = "pending";
          })
          .addCase(productFetch.fulfilled, (state, action) => {
            state.status = "success";
            state.items = action.payload;
          })
          .addCase(productFetch.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
          });
    },
});

export default productsSlice.reducer;

