import { createSlice } from "@reduxjs/toolkit";
import { listingOperations } from "./listing-operations";

const initialState = {
  listing: null,
  loading: false,
  error: null,
};

const listingSlice = createSlice({
  name: "listing",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(listingOperations.create.pending, (state) => {
        state.loading = true;
      })
      .addCase(listingOperations.create.fulfilled, (state, action) => {
        console.log(action);
        state.loading = false;
      })
      .addCase(listingOperations.create.rejected, (state, action) => {
        state.loading = false;
        console.log(action);
      });
  },
});

export default listingSlice.reducer;
