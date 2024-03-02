import { createSlice } from "@reduxjs/toolkit";
import { listingOperations } from "./listing-operations";

const initialState = {
  listingData: [],
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
        state.listingData = [...state.listingData, action.payload.data];
        state.loading = false;
        state.error = null;
      })
      .addCase(listingOperations.create.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default listingSlice.reducer;
