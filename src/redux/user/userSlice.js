import { createSlice } from "@reduxjs/toolkit";
import { userOperations } from "./user-operations";

const initialState = {
  userData: null,
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
        console.log(action);
        state.error = action.payload.message;
        state.loading = false;
        state.userData = null;
      })
      .addCase(userOperations.googleAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(userOperations.googleAuth.fulfilled, (state, action) => {
        console.log(action);
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
        console.log(action);
        state.loading = false;
        state.error = null;
      })
      .addCase(userOperations.update.rejected, (state, action) => {
        state.userData = null;
        state.loading = false;
        console.log(action);
      });
  },
});

export default userSlice.reducer;
