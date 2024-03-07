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
      .addCase(listingOperations.getAll.pending, (state) => {
        state.loading = true;
      })
      .addCase(listingOperations.getAll.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.listingData = action.payload.data;
      })
      .addCase(listingOperations.getAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      })
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
      })
      .addCase(listingOperations.deleteListing.pending, (state) => {
        state.loading = true;
      })
      .addCase(listingOperations.deleteListing.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log(action);
        state.listingData = state.listingData.filter(
          (listing) => listing?._id !== action.payload.data?._id
        );
      })
      .addCase(listingOperations.deleteListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default listingSlice.reducer;
