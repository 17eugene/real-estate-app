import { createAsyncThunk } from "@reduxjs/toolkit";

const getAll = createAsyncThunk(
  "listing/getAll",
  async ({ page, limit, type, filterQueries }, { rejectWithValue }) => {
    let URL = `http://localhost:2222/api/listing/all?page=${page}&limit=${limit}&type=${type}`;

    for (let query in filterQueries) {
      if (
        filterQueries[query] &&
        filterQueries[query] !== null &&
        filterQueries[query] !== "null"
      ) {
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

const getSearchedListings = createAsyncThunk(
  "listing/getSearchedListings",
  async ({ query, page, limit }, { rejectWithValue }) => {
    const response = await fetch(
      `http://localhost:2222/api/listing?page=${page}&limit=${limit}&searchQuery=${query}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

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

const getOwnListings = createAsyncThunk(
  "listing/getOwnListings",
  async (userId, { rejectWithValue }) => {
    const response = await fetch(
      `http://localhost:2222/api/listing/listings/${userId}`,
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

const getAuthorsListings = createAsyncThunk(
  "listing/getAuthorsListings",
  async (authorId, { rejectWithValue }) => {
    const response = await fetch(
      `http://localhost:2222/api/listing/listingsByAuthor/${authorId}`,
      {
        method: "GET",
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
  "listing/updateListing",
  async ({ id, values }, { rejectWithValue }) => {
    const editedListingData = {
      region: values.region,
      settlement: values.settlement,
      street: values.street,
      houseNumber: values.houseNumber,
      description: values.description,
      type: values.type,
      furnished: values.furnished,
      petsAllowed: values.petsAllowed,
      parking: values.parking,
      gatedCommunity: values.gatedCommunity,
      floor: values.floor,
      squareMeters: values.squareMeters,
      bedrooms: values.bedrooms,
      price: values.price,
      photos: values.photos,
    };
    const response = await fetch(
      `http://localhost:2222/api/listing/update/${id}`,
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

const updateListingFiles = createAsyncThunk(
  "listing/updateListingFiles",
  async ({ id, values }, { rejectWithValue }) => {
    const updatedFilesData = {
      photos: values,
    };

    const response = await fetch(
      `http://localhost:2222/api/listing/updateFiles/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedFilesData),
      }
    );

    if (response.status !== 200) {
      const data = rejectWithValue(await response.json());
      console.log(data);
      // return data;
    }

    const data = await response.json();
    console.log(data);
    // return data;
  }
);

export const listingOperations = {
  getAll,
  create,
  getOwnListings,
  getAuthorsListings,
  deleteListing,
  updateListing,
  getListing,
  updateListingFiles,
  getSearchedListings,
};
