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

/*------------------------------------------------------------------------------------- */

const signin = createAsyncThunk(
  "user/signin",
  async (credentials, { rejectWithValue }) => {
    const response = await fetch("http://localhost:2222/api/auth/signin", {
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
    console.log(data);
    return data;
  }
);

/*------------------------------------------------------------------------------------- */

const googleAuth = createAsyncThunk(
  "user/signinWithGoogle",
  async (credentials, { rejectWithValue }) => {
    const response = await fetch("http://localhost:2222/api/auth/googleAuth", {
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

/*------------------------------------------------------------------------------------- */

const getCurrentUser = createAsyncThunk(
  "user/refresh",
  async (_, { rejectWithValue }) => {
    const response = await fetch("http://localhost:2222/api/user/current", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });

    if (response.status !== 200) {
      const data = rejectWithValue({ error_message: "User not authorized" });
      return data;
    }

    const data = await response.json();
    return data;
  }
);

/*------------------------------------------------------------------------------------- */

const update = createAsyncThunk(
  "user/update",
  async (credentials, { rejectWithValue }) => {
    const editedUserData = {
      username: credentials.username,
      avatar: credentials.avatar,
    };
    const response = await fetch(
      `http://localhost:2222/api/user/update/${credentials.userId}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(editedUserData),
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

/*------------------------------------------------------------------------------------- */

const deleteUser = createAsyncThunk(
  "user/delete",
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `http://localhost:2222/api/user/delete/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (response.status !== 200) {
      const data = rejectWithValue(await response.json());
      return data;
    }
  }
);

/*------------------------------------------------------------------------------------- */

const signout = createAsyncThunk("auth/signout", async () => {
  await fetch("http://localhost:2222/api/auth/signout", {
    method: "POST",
    credentials: "include",
  });
});

export const userOperations = {
  signup,
  signin,
  googleAuth,
  getCurrentUser,
  update,
  deleteUser,
  signout,
};
