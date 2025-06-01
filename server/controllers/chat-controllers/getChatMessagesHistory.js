const { default: mongoose } = require("mongoose");
const { ChatRoom } = require("../../models");

const getChatMessagesHistory = async (req, res, next) => {
  const { roomId } = req.params;

  try {
    const messages = await ChatRoom.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(roomId) } },

      {
        $lookup: {
          from: "chatmessages",
          localField: "_id",
          foreignField: "room",
          as: "messagesHistory",
        },
      },

      // { $unwind: "$messagesHistory" },
    ]);

    res.status(200).json({
      message: "Messages received",
      code: 200,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getChatMessagesHistory;
