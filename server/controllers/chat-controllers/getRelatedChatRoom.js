const { ChatRoom } = require("../../models");

const getRelatedChatRoom = async (req, res, next) => {
  const { ownerId, listingId } = req.params;
  const userId = req.user._id;

  try {
    const room = await ChatRoom.findOne({
      listing: listingId,
      listingAuthor: ownerId,
      chatCreator: userId,
    }).populate("chatCreator listingAuthor", "username avatar isLoggedIn");

    if (!room) {
      const error = new Error("Chat room not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      message: "Success",
      code: 200,
      data: room,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getRelatedChatRoom;
