import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: [],
    status :null,
};


export const productFetch = createAsyncThunk(
    "products/productsFetch",
    async()=>{
       const response = await axios.get("http://localhost:3000/products")
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
          });
    },
});

export default productsSlice.reducer