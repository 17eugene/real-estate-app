import { createSlice } from "@reduxjs/toolkit";
import { userOperations } from "./user-operations";
import { listingOperations } from "../listing/listing-operations";

const initialState = {
  userData: null,
  userListings: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(userOperations.signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(userOperations.signup.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(userOperations.signup.rejected, (state, action) => {
        state.error = action.payload.message;
        state.loading = false;
      })
      .addCase(userOperations.signin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userOperations.signin.fulfilled, (state, action) => {
        console.log(action);
        state.userData = action.payload.userData;
        state.loading = false;
        state.error = null;
      })
      .addCase(userOperations.signin.rejected, (state, action) => {
        state.error = action.payload.message;
        state.loading = false;
        state.userData = null;
      })
      .addCase(userOperations.googleAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(userOperations.googleAuth.fulfilled, (state, action) => {
        state.userData = action.payload.userData;
        state.error = null;
        state.loading = false;
      })
      .addCase(userOperations.googleAuth.rejected, (state, action) => {
        state.error =
          "Username is longer then maximum allowed length (50)" ||
          action.payload.message;
        state.loading = false;
        state.userData = null;
      })
      .addCase(userOperations.update.pending, (state) => {
        state.loading = true;
      })
      .addCase(userOperations.update.fulfilled, (state, action) => {
        state.userData = action.payload.userData;
        state.loading = false;
        state.error = null;
      })
      .addCase(userOperations.update.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(userOperations.deleteUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userOperations.deleteUser.fulfilled, (state, action) => {
        state.userData = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(userOperations.deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(userOperations.signout.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(userOperations.signout.fulfilled, (state, _) => {
        state.userData = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(userOperations.signout.rejected, (state, action) => {
        state.loading = false;
        console.log(action);
      })
      .addCase(listingOperations.getUserListings.pending, (state) => {
        state.loading = true;
      })
      .addCase(listingOperations.getUserListings.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userListings = [...action.payload.data];
      })
      .addCase(listingOperations.getUserListings.rejected, (state, action) => {
        state.loading = false;
        console.log(action);
      });
  },
});

export default userSlice.reducer;
