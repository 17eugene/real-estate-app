import { createSlice } from "@reduxjs/toolkit";
import { listingOperations } from "./listing-operations";

const initialState = {
  listingData: [],
  currentListing: null,
  userListings: [],
  totalListings: null,
  loading: false,
  error: null,
};

const listingSlice = createSlice({
  name: "listing",
  initialState,
  extraReducers: (builder) => {
    builder
      /*-----------GET ALL------------*/
      .addCase(listingOperations.getAll.pending, (state) => {
        state.loading = true;
      })
      .addCase(listingOperations.getAll.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.listingData = action.payload.data;
        state.totalListings = action.payload.info.total;
      })
      .addCase(listingOperations.getAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.data;
        state.currentListing = null;
      })
      /*-----------CREATE------------*/
      .addCase(listingOperations.create.pending, (state) => {
        state.loading = true;
      })
      .addCase(listingOperations.create.fulfilled, (state, action) => {
        state.listingData = [...state.listingData, action.payload.data];
        state.loading = false;
        state.error = null;
        state.currentListing = null;
      })
      .addCase(listingOperations.create.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.currentListing = null;
      })
      /*-----------GET USER LISTINGS------------*/
      .addCase(listingOperations.getUserListings.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(listingOperations.getUserListings.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userListings = action.payload.data;
        console.log(action.payload.data);
      })
      .addCase(listingOperations.getUserListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      /*-----------DELETE------------*/
      .addCase(listingOperations.deleteListing.pending, (state) => {
        state.loading = true;
      })
      .addCase(listingOperations.deleteListing.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.listingData = state.listingData.filter(
          (listing) => listing?._id !== action.payload.data?._id
        );
        state.currentListing = null;
      })
      .addCase(listingOperations.deleteListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.currentListing = null;
      })
      /*-----------UPDATE------------*/
      .addCase(listingOperations.updateListing.pending, (state) => {
        state.loading = true;
      })
      .addCase(listingOperations.updateListing.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.listingData = state.listingData.map((listing) =>
          listing._id === action.payload.data._id
            ? action.payload.data
            : listing
        );
      })
      .addCase(listingOperations.updateListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      /*-----------GET CURRENT LISTING------------*/
      .addCase(listingOperations.getListing.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(listingOperations.getListing.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.currentListing = action.payload?.data;
      })
      .addCase(listingOperations.getListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export const { setCurrent } = listingSlice.actions;

export default listingSlice.reducer;
