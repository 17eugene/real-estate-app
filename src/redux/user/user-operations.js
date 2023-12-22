import { createAsyncThunk } from "@reduxjs/toolkit";

const signup = createAsyncThunk(
  "user/signup",
  async (credentials, { rejectWithValue }) => {
    const response = await fetch("http://localhost:2222/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (response.status !== 201) {
      const data = rejectWithValue(await response.json());
      return data;
    }

    const data = await response.json();
    return data;
  }
);

const signin = createAsyncThunk(
  "user/signin",
  async (credentials, { rejectWithValue }) => {
    const response = await fetch("http://localhost:2222/api/auth/signin", {
      method: "POST",
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

const googleAuth = createAsyncThunk(
  "user/signinWithGoogle",
  async (credentials, { rejectWithValue }) => {
    const response = await fetch(
      "http://localhost:2222/api/auth/googleAuth",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(credentials),
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

export const userOperations = { signup, signin, googleAuth };
