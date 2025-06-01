import { createAsyncThunk } from "@reduxjs/toolkit";

const openChatRoom = createAsyncThunk(
  "chat/createChatRoom",
  async (credentials, { rejectWithValue }) => {
    const response = await fetch(`http://localhost:2222/api/chat/openChat`, {
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

const createChatMessage = createAsyncThunk(
  "chat/createMessage",
  async (credentials, { rejectWithValue }) => {
    const response = await fetch(`http://localhost:2222/api/chat/sendMessage`, {
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

const getChatMessagesHistory = createAsyncThunk(
  "chat/getMessagesHistory",
  async (roomId, { rejectWithValue }) => {
    const response = await fetch(
      `http://localhost:2222/api/chat/${roomId}/getMessages`,
      {
        method: "GET",
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

const getChatRoom = createAsyncThunk(
  "chat/getChatRoom",
  async ({ owner, listingId }, { rejectWithValue }) => {
    const response = await fetch(
      `http://localhost:2222/api/chat/getChatRoom/${owner}/${listingId}`,
      {
        method: "GET",
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

const getUserChatRooms = createAsyncThunk(
  "chat/getUserChatRooms",
  async (userId, { rejectWithValue }) => {
    const response = await fetch(
      `http://localhost:2222/api/chat/getUserChatRooms/${userId}`,
      {
        method: "GET",
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

export const chatOperations = {
  openChatRoom,
  createChatMessage,
  getChatMessagesHistory,
  getChatRoom,
  getUserChatRooms,
};
