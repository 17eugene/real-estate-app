import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  price: {
    minimum: 0,
    maximum: 0,
  },
  bedrooms: "any",
  more: {
    pets: false,
    furnished: false,
    parking: false,
  },
};

const filterSlice = createSlice({
  name: "filterData",
  initialState,
  reducers: {
    setPriceRange: (state, action) => {
      state.price = action.payload;
    },
    setBedroomsNumber: (state, action) => {
      state.bedrooms = action.payload;
    },
    setMoreOptions: (state, action) => {
      state.more = action.payload;
    },
  },
});

export const { setPriceRange, setBedroomsNumber, setMoreOptions } =
  filterSlice.actions;

export default filterSlice.reducer;
