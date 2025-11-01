import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await axios.get("http://localhost:3000/products");
  return res.data;
});

const productsSlice = createSlice({
  name: "products",
  initialState: { list: [] as any[], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export default productsSlice.reducer;
