const { ChatRoom } = require("../../models");

const openChatRoom = async (req, res, next) => {
  const { listing, chatCreator, listingAuthor } = req.body;
  try {
    const room = await ChatRoom.create({ listing, chatCreator, listingAuthor });

    if (!room) {
      const error = new Error("Something went wrong");
      error.status = 400;
      throw error;
    }

    res.status(200).json({
      message: `Chat room ${listing} created`,
      code: 201,
      data: room,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = openChatRoom;
