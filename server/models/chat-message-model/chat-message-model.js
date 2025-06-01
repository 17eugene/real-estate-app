const { Schema, model, version } = require("mongoose");

const chatMessageSchema = Schema(
  {
    text: {
      type: String,
      required: true,
      minLength: 1,
      trim: true,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    room: {
      type: Schema.Types.ObjectId,
      ref: "ChatRoom",
    },

    viewed: {
      type: Boolean,
    },
  },
  { timestamps: true, versionKey: false }
);

const ChatMessage = model("ChatMessage", chatMessageSchema);

module.exports = ChatMessage;
