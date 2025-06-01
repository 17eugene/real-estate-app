import { createSlice } from "@reduxjs/toolkit";
import { chatOperations } from "./chat-operations";

const initialState = {
  room: null,
  roomCollection: [],
  messages: [],
  chatLoading: false,
  chatError: null,
  messageLoading: false,
  messageError: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    selectChatRoom: (state, action) => {
      state.room = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      /*----------------------------CREATE CHAT------------------------------ */
      .addCase(chatOperations.openChatRoom.pending, (state, _) => {
        state.chatLoading = true;
      })
      .addCase(chatOperations.openChatRoom.fulfilled, (state, action) => {
        state.chatLoading = false;
        state.chatError = null;
        state.room = action.payload?.data;
      })
      .addCase(chatOperations.openChatRoom.rejected, (state, action) => {
        state.chatLoading = false;
        state.room = null;
        state.chatError = action.payload?.message;
      })
      /*----------------------------GET CHAT------------------------------ */
      .addCase(chatOperations.getChatRoom.pending, (state, _) => {
        state.chatLoading = true;
      })
      .addCase(chatOperations.getChatRoom.fulfilled, (state, action) => {
        state.room = action.payload?.data;
        state.chatLoading = false;
        state.chatError = null;
      })
      .addCase(chatOperations.getChatRoom.rejected, (state, action) => {
        state.chatLoading = false;
        state.chatError = action.payload?.message;
        state.messages = [];
        state.room = null;
      })
      /*----------------------------CREATE MESSAGE------------------------------ */
      .addCase(chatOperations.createChatMessage.pending, (state, _) => {
        state.messageLoading = true;
      })
      .addCase(chatOperations.createChatMessage.fulfilled, (state, action) => {
        state.messageLoading = false;
        state.messageError = null;
        state.messages = [...state.messages, action.payload.data];
      })
      .addCase(chatOperations.createChatMessage.rejected, (state, action) => {
        state.messageLoading = false;
        state.messageError = action.payload;
      })
      /*----------------------------GET MESSAGES HISTORY------------------------------ */
      .addCase(chatOperations.getChatMessagesHistory.pending, (state, _) => {
        state.messageLoading = true;
      })
      .addCase(
        chatOperations.getChatMessagesHistory.fulfilled,
        (state, action) => {
          state.messageLoading = false;
          state.messageError = null;
          state.chatError = null;
          state.messages = action.payload.data[0].messagesHistory;
        }
      )
      .addCase(
        chatOperations.getChatMessagesHistory.rejected,
        (state, action) => {
          state.messageLoading = false;
          state.messageError = action.payload.message;
        }
      )
      /*----------------------------GET USER CHAT ROOMS------------------------------ */
      .addCase(chatOperations.getUserChatRooms.pending, (state, _) => {
        state.chatLoading = true;
      })
      .addCase(chatOperations.getUserChatRooms.fulfilled, (state, action) => {
        state.chatLoading = false;
        state.chatError = null;
        state.roomCollection = action.payload.data;
        state.room = null;
      })
      .addCase(chatOperations.getUserChatRooms.rejected, (state, action) => {
        state.chatError = action.payload.message;
        state.chatLoading = false;
        state.roomCollection = [];
        state.room = null;
      });
  },
});

export default chatSlice.reducer;
export const { selectChatRoom } = chatSlice.actions;
