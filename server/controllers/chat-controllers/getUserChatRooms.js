const { ChatRoom } = require("../../models");

const getUserChatRooms = async (req, res, next) => {
  const { userId } = req.params;

  try {
    if (userId !== req.user.id) {
      const error = new Error("Forbidden");
      error.status = 403;
      throw error;
    }

    const roomsCollection = await ChatRoom.find({
      $or: [{ chatCreator: userId }, { listingAuthor: userId }],
    }).populate(
      "listing chatCreator listingAuthor",
      "name type price settlement street houseNumber username email isLoggedIn avatar"
    );

    res.status(200).json({
      message: "Successfully received",
      code: 200,
      data: roomsCollection,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getUserChatRooms;
