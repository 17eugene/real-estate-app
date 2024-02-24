import { createAsyncThunk } from "@reduxjs/toolkit";

const create = createAsyncThunk(
  "listing/create",
  async (credentials, { rejectWithValue }) => {
    const response = await fetch("http://localhost:2222/api/listing/create", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    console.log(response);
  }
);

export const listingOperations = { create };
