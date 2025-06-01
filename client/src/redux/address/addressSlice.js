import { createSlice } from "@reduxjs/toolkit";
import { addressOperations } from "./address-operations";

const initialState = {
  regionList: [],
  selectedRegion: null,
  settlementList: [],
  loading: false,
  error: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  extraReducers: (builder) => {
    builder
      /*-------------------------------GET REGIONS LIST-----------------------------------*/
      .addCase(addressOperations.getRegionList.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(addressOperations.getRegionList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.regionList = action.payload.data;
        state.selectedRegion = null;
      })
      .addCase(addressOperations.getRegionList.rejected, (state, action) => {
        state.loading = false;
        state.regionList = [];
        state.error = action.payload?.message;
        state.selectedRegion = null;
      })
      /*-------------------------------GET CITIES LIST-----------------------------------*/
      .addCase(addressOperations.getCitiesByRegion.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(
        addressOperations.getCitiesByRegion.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;
          state.settlementList = action.payload?.data;
        }
      )
      .addCase(
        addressOperations.getCitiesByRegion.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload?.message;
          state.settlementList = [];
        }
      );
  },
});

export default addressSlice.reducer;
