import { createAsyncThunk } from "@reduxjs/toolkit";

const getAll = createAsyncThunk(
  "listing/getAll",
  async ({ page, limit, type, filterQueries }, { rejectWithValue }) => {
    let URL = `http://localhost:2222/api/listing/all?page=${page}&limit=${limit}&type=${type}`;

    console.log(filterQueries);

    for (let query in filterQueries) {
      if (filterQueries[query] || filterQueries[query] === false) {
        console.log(filterQueries[query]);
        URL = URL + `&${query}=${filterQueries[query]}`;
      }
    }
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (response.status !== 200) {
      const data = rejectWithValue(await response.json());
      return data;
    }

    const data = await response.json();
    return data;
  }
);

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
      console.log(data);
      return data;
    }

    const data = await response.json();
    console.log(data);
    return data;
  }
);

const getUserListings = createAsyncThunk(
  "listing/getUserListings",
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `http://localhost:2222/api/user/listings/${id}`,
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

const deleteListing = createAsyncThunk(
  "listing/deleteListing",
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `http://localhost:2222/api/listing/delete/${id}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      const data = rejectWithValue(await response.json());
      return data;
    }

    const data = await response.json();
    return data;
  }
);

const getListing = createAsyncThunk(
  "listing/getListing",
  async (id, { rejectWithValue }) => {
    const response = await fetch(`http://localhost:2222/api/listing/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (response.status !== 200) {
      const data = rejectWithValue(await response.json());
      return data;
    }

    const data = await response.json();
    return data;
  }
);

const updateListing = createAsyncThunk(
  "listing/update",
  async (credentials, { rejectWithValue }) => {
    const editedListingData = {
      name: credentials.name,
      description: credentials.description,
      address: credentials.address,
      type: credentials.type,
      furnished: credentials.furnished,
      petsAllowed: credentials.petsAllowed,
      offer: credentials.offer,
      bedrooms: credentials.bedrooms,
      price: credentials.price,
      photos: credentials.photos,
    };
    const response = await fetch(
      `http://localhost:2222/api/listing/update/${credentials.id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(editedListingData),
      }
    );

    if (response.status !== 200) {
      const data = rejectWithValue(await response.json());
      return data;
    }

    const data = await response.json();
    return data;
  }
);

export const listingOperations = {
  getAll,
  create,
  getUserListings,
  deleteListing,
  updateListing,
  getListing,
};
