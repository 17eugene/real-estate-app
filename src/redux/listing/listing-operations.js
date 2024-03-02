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

    if (response.status !== 200) {
      const data = rejectWithValue(await response.json());
      return data;
    }

    const data = await response.json();
    return data;
  }
);

const getUserListings = createAsyncThunk(
  "listing/getUserListings",
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `http://localhost:2222/api/listing/listings/${id}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (response.status !== 201) {
      const data = rejectWithValue(await response.json());
      return data;
    }

    const data = await response.json();
    return data;
  }
);

export const listingOperations = { create, getUserListings };
