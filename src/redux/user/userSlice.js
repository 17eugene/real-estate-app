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
        state.userData = action.payload.userData.id;
        state.loading = false;
        state.error = null;
      })
      .addCase(userOperations.signin.rejected, (state, action) => {
        console.log(action);
        state.error = action.payload.message;
        state.loading = false;
        state.userData = null;
      });
  },
});

export default userSlice.reducer;