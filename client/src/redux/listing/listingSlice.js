import { createSlice } from "@reduxjs/toolkit";
import { listingOperations } from "./listing-operations";

const initialState = {
  listingData: {
    listings: [],
    searchedListingData: {
      query: "",
      listings: [],
      total: null,
    },
    currentListing: null,
    totalListings: null,
  },
  ownListings: [],
  authorsListings: [],
  loading: false,
  error: null,
};

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    setQueryString: (state, action) => {
      state.listingData.searchedListingData.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      /*-----------GET ALL------------*/
      .addCase(listingOperations.getAll.pending, (state) => {
        state.loading = true;
      })
      .addCase(listingOperations.getAll.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.listingData.listings = action.payload.data;
        state.listingData.totalListings = action.payload.info.total;
        // state.listingData.searchedListingData = null;
      })
      .addCase(listingOperations.getAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.data;
        state.listingData.currentListing = null;
        // state.listingData.searchedListingData = null;
      })
      /*-----------CREATE------------*/
      .addCase(listingOperations.create.pending, (state) => {
        state.loading = true;
      })
      .addCase(listingOperations.create.fulfilled, (state, action) => {
        state.listingData.listings = [
          ...state.listingData.listings,
          action.payload.data,
        ];
        state.loading = false;
        state.error = null;
        state.listingData.currentListing = null;
        state.listingData.searchedListingData = null;
      })
      .addCase(listingOperations.create.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.listingData.currentListing = null;
        state.listingData.searchedListingData = null;
      })
      /*-----------------GET OWN LISTINGS----------------*/
      .addCase(listingOperations.getOwnListings.pending, (state, _) => {
        state.loading = true;
        state.listingData.totalListings = null;
      })
      .addCase(listingOperations.getOwnListings.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.ownListings = action.payload.data;
        state.listingData.totalListings = null;
        // state.listingData.searchedListingData = null;
      })
      .addCase(listingOperations.getOwnListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
        state.listingData.totalListings = null;
        // state.listingData.searchedListingData = null;
      })
      /*--------------------GET AUTHOR'S LISTINGS---------------------*/
      .addCase(listingOperations.getAuthorsListings.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(
        listingOperations.getAuthorsListings.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;
          state.authorsListings = action.payload.data;
        }
      )
      .addCase(
        listingOperations.getAuthorsListings.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        }
      )
      /*--------------------DELETE---------------------*/
      .addCase(listingOperations.deleteListing.pending, (state) => {
        state.loading = true;
        // state.listingData.searchedListingData = null;
      })
      .addCase(listingOperations.deleteListing.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.listingData.listings = state.listingData.listings.filter(
          (listing) => listing?._id !== action.payload.data?._id
        );
        state.userListings = state.userListings.filter(
          (listing) => listing?._id !== action.payload.data?._id
        );
        state.currentListing = null;
      })
      .addCase(listingOperations.deleteListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.listingData.currentListing = null;
      })
      /*-----------UPDATE------------*/
      .addCase(listingOperations.updateListing.pending, (state) => {
        state.loading = true;
        // state.listingData.searchedListingData = null;
      })
      .addCase(listingOperations.updateListing.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.listingData.listings = state.listingData.listings.map((listing) =>
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
        state.listingData.currentListing = null;
      })
      .addCase(listingOperations.getListing.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.listingData.currentListing = action.payload?.data;
        // state.listingData.searchedListingData = null;
      })
      .addCase(listingOperations.getListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      /*-----------UPDATE LISTING FILES------------*/
      .addCase(listingOperations.updateListingFiles.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(listingOperations.updateListingFiles.fulfilled, (state, _) => {
        state.loading = false;
        state.error = null;
      })
      /*-----------GET SEARCHED LISTINGS------------*/
      .addCase(listingOperations.getSearchedListings.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(
        listingOperations.getSearchedListings.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;
          state.listingData.searchedListingData.listings = action.payload.data;
          state.listingData.searchedListingData.total =
            action.payload.info?.total;
        }
      )
      .addCase(
        listingOperations.getSearchedListings.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        }
      );
  },
});

export const { setQueryString } = listingSlice.actions;

export default listingSlice.reducer;
