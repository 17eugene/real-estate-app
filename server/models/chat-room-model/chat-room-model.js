const { Schema, model } = require("mongoose");

const chatRoomSchema = Schema(
  {
    chatCreator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    listingAuthor: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    listing: {
      type: Schema.Types.ObjectId,
      ref: "Listing",
    },
  },
  { timestamps: true, versionKey: false }
);

const ChatRoom = model("ChatRoom", chatRoomSchema);

module.exports = ChatRoom;
